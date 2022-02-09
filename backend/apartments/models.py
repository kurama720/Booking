import uuid
from datetime import datetime

from django.db import models, transaction
from django.db.models import Q, F, Avg, Count
from django.shortcuts import get_object_or_404
from django.core.validators import MaxValueValidator

from accounts.models import ClientUser, BusinessClientUser
from apartments.utils import Round
from apartments.validators import SCHEMA, JSONSchemaValidator


def apartment_directory_path(instance, filename):
    return f"apartments/{instance.apartments.title}/{filename}"


class Apartment(models.Model):
    """Model for defining apartments"""
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    title = models.TextField()
    price = models.PositiveIntegerField(db_index=True)
    lat = models.FloatField()
    lon = models.FloatField()
    description = models.TextField()
    rating = models.PositiveIntegerField(blank=True, null=True)
    business_account = models.ForeignKey(BusinessClientUser,
                                         related_name='apartments',
                                         on_delete=models.CASCADE,
                                         null=True)
    feature = models.JSONField(validators=[JSONSchemaValidator(limit_value=SCHEMA)], blank=True, null=True)
    user = models.ManyToManyField(ClientUser, related_name='favorite_apartments', blank=True)

    def check_apartment_booking(self, client_check_in_date: datetime.date,
                                client_check_out_date: datetime.date) -> int:
        """
        Check the availability of apartment for booking

        check 1 - apartment is booked before client_check_in_date
        and checks out after requested client_check_in_date
        check 2 - apartment is booked before requested client_check_out_date
        and check_out date is after requested client_check_out_date
        check 3 - apartment is booked after requested client_check_in_date
        and check_out date is before requested client_check_out_date
        :param client_check_in_date: first day of booking
        :param client_check_out_date: last day of booking
        :return: number of booked apartments for client's dates
        """
        return Booking.objects.filter(Q(apartment=self) &
                                      (Q(check_in_date__lt=client_check_in_date,
                                         check_out_date__gt=client_check_in_date) |
                                       Q(check_in_date__lt=client_check_out_date,
                                         check_out_date__gt=client_check_out_date) |
                                       Q(check_in_date__gte=client_check_in_date,
                                         check_out_date__lte=client_check_out_date))).count()

    def book_apartment(self, client_check_in_date: datetime.date, client_check_out_date: datetime.date,
                       client_num_of_persons: int, client_comment: str, client_idempotency_key: str,
                       client_user: ClientUser) -> bool:
        """
        Apartment booking

        :param client_check_in_date: first day of booking
        :param client_check_out_date: last day of booking
        :param client_num_of_persons: number of persons
        :param client_comment: comment on booking
        :param client_idempotency_key: unique request key
        :param client_user: client from request
        :return: "True" if apartment is available for booking
        :return: "False" if apartment is not available for booking
        """
        with transaction.atomic():
            Apartment.objects.select_for_update().get(id=self.id)
            client_user = get_object_or_404(ClientUser, email=client_user)
            if not self.check_apartment_booking(client_check_in_date,
                                                client_check_out_date):
                Booking.objects.create(
                    apartment=self,
                    check_in_date=client_check_in_date,
                    check_out_date=client_check_out_date,
                    num_of_persons=client_num_of_persons,
                    comment=client_comment,
                    idempotency_key=client_idempotency_key,
                    client=client_user,
                    business_client=self.business_account
                )
                return True
            return False

    def apartment_review(self, client_comment: str,  client_rate: int,
                          client_user: ClientUser) -> None:
        """
        Add apartment review

        :param client_comment: comment on apartment
        :param client_rate: apartment rate
        :param client_user: client from request
        :return: None
        """
        client_user = get_object_or_404(ClientUser, email=client_user)
        return ApartmentReview.objects.create(
            apartment=self,
            comment=client_comment,
            rate=client_rate,
            client=client_user
        )

    def get_apartment_reviews_information(self) -> dict:
        """
        Get average apartment rate and number of apartment reviews

        :return: rate data and number of reviews in dict format
        """
        return ApartmentReview.objects.filter(apartment=self).aggregate(rate=Round(Avg(F('rate'))),
                                                                        reviews=Count('rate'))

    def get_apartment_reviews(self) -> dict:
        """
        Get average apartment rate and apartment reviews

        :return: rate and reviews data in dict format
        """
        apartment_review_data = ApartmentReview.objects.filter(apartment=self)
        reviews_response = apartment_review_data.aggregate(rate=Round(Avg(F('rate'))))
        apartment_reviews = {'reviews': list(apartment_review_data.values('comment', 'rate'))}
        reviews_response.update(apartment_reviews)
        return reviews_response

    def add_images_to_apartments(self,
                                 images: list) -> None:
        """
        This function create images model objects and
        bound them to apartments object.

        :param images: images intermediate objects list
        :return: None
        """
        uploaded_images = []
        images_names = [image.name for image in images]
        existing_apartment_images = ApartmentsImage.objects.filter(apartments=self)
        stored_images_names = [image.img.name.split("/")[-1] for image in existing_apartment_images]
        bound_images_names = [image.img.name.split("/")[-1] for image in self.img_content.all()]
        if (not set(bound_images_names).intersection(set(images_names)) or
                len(bound_images_names) > len(images_names)):
            existing_apartment_images.delete()
        for image in images:
            if image.name not in stored_images_names:
                content = ApartmentsImage.objects.create(apartments=self,
                                                         img=image)
                uploaded_images.append(content)
            elif image.name not in bound_images_names:
                index = stored_images_names.index(image.name)
                content = existing_apartment_images[index]
                uploaded_images.append(content)

    @classmethod
    def get_prices_count_by_location(cls, flat: list[list]) -> dict:
        """
        Finds all hotels in the given location and represent them like {hotels_price: hotels_count}
        :param flat: list that contain coordinates of bottom left and
         top right angles square location
        :return: list of apartments
        """
        latitude_bottom, longitude_bottom = flat[0]
        latitude_top, longitude_top = flat[1]
        analytic_data = cls.objects.filter((Q(lat__gt=latitude_bottom) &
                                            Q(lat__lt=latitude_top)) &
                                           (Q(lon__gt=longitude_bottom) &
                                            Q(lon__lt=longitude_top))).values(
                                                  "price").annotate(hotels_count=Count("id"))
        data = dict(prices=[{item["price"]:
                             item["hotels_count"]} for item in analytic_data])
        return data

    def __str__(self):
        return self.title


class Booking(models.Model):
    """Model for defining booking apartments"""
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    num_of_persons = models.PositiveIntegerField()
    comment = models.TextField(blank=True, null=True)
    idempotency_key = models.UUIDField(unique=True)
    client = models.ForeignKey(ClientUser, on_delete=models.CASCADE)
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name='bookings')
    business_client = models.ForeignKey(BusinessClientUser,
                                        related_name='booking',
                                        on_delete=models.CASCADE,
                                        null=True)


class ApartmentReview(models.Model):
    """Model for defining apartments reviews"""
    comment = models.TextField()
    rate = models.PositiveIntegerField(validators=[MaxValueValidator(5)])
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE)
    client = models.ForeignKey(ClientUser, on_delete=models.CASCADE)


class ApartmentsImage(models.Model):
    """Model to representation apartments images"""
    apartments = models.ForeignKey(Apartment,
                                   related_name="img_content",
                                   on_delete=models.CASCADE,
                                   null=True)
    img = models.ImageField(upload_to=apartment_directory_path)

    def __str__(self):
        return str(self.img)
