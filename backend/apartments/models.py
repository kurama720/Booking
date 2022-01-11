import uuid
from datetime import datetime

from django.db import models, transaction
from django.db.models import Q
from django.utils import timezone
from django.shortcuts import get_object_or_404

from accounts.models import ClientUser, BusinessClientUser


class Apartment(models.Model):
    """Model for defining apartments"""
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    title = models.TextField()
    price = models.PositiveIntegerField(db_index=True)
    img = models.ImageField(upload_to='apartments/')
    lat = models.FloatField()
    lon = models.FloatField()
    description = models.TextField()
    num_of_bedrooms = models.PositiveIntegerField(default=2)
    rating = models.PositiveIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    business_account = models.ForeignKey(BusinessClientUser,
                                         related_name='apartments',
                                         on_delete=models.CASCADE,
                                         null=True)

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
        :param apartment_id: apartment unique id
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
                       client_user: ClientUser):
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
                    client=client_user
                )
                return True
            return False

    def __str__(self):
        return self.title


class Booking(models.Model):
    """Model for defining booking apartments"""
    check_in_date = models.DateField(default=timezone.now)
    check_out_date = models.DateField(default=timezone.now)
    num_of_persons = models.PositiveIntegerField()
    comment = models.TextField(blank=True)
    idempotency_key = models.UUIDField(default=uuid.uuid4, unique=True)
    client = models.ForeignKey(ClientUser, on_delete=models.CASCADE)
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE)
