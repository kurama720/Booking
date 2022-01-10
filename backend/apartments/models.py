import uuid
from datetime import datetime

from django.db import models
from django.db.models import Q

from accounts.models import ClientUser

from accounts.models import BusinessClientUser


class Apartment(models.Model):
    """Model for defining apartments"""
    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    title = models.TextField(unique=True)
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

    def __str__(self):
        return self.title


class Booking(models.Model):
    """Model for defining booking apartments"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False) # unique id
    check_in_date = models.DateField(default=datetime.now) # first day of booking
    check_out_date = models.DateField(default=datetime.now) # last day of booking
    num_of_persons = models.PositiveIntegerField(default=1) # number of persons
    comment = models.TextField(blank=True) # comment on booking
    client = models.ForeignKey(ClientUser, on_delete=models.CASCADE) # client unique id
    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE) # apartment unique id

    class Meta:
        verbose_name = 'Booking'
        verbose_name_plural = 'Booking'
        ordering = ('apartment', 'check_in_date')
        unique_together = ('apartment', 'check_in_date', 'check_out_date')


def available_to_book(apartment_id: str, client_check_in_date: str,
                      client_check_out_date: str) -> int:
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
    return Booking.objects.filter(Q(apartment=apartment_id) &
                                  (Q(check_in_date__lt=client_check_in_date,
                                     check_out_date__gt=client_check_in_date) |
                                  Q(check_in_date__lt=client_check_out_date,
                                    check_out_date__gt=client_check_out_date) |
                                  Q(check_in_date__gte=client_check_in_date,
                                    check_out_date__lte=client_check_out_date))).count()


def check_booking_client(apartment_id: str, client_check_in_date: str,
                         client_check_out_date: str,
                         client_id: int) -> bool:
    """
    Check booking for client's dates

    :param apartment_id: apartment unique id
    :param client_check_in_date: first day of booking
    :param client_check_out_date: last day of booking
    :param client_id: client unique id
    :return: "True" if booking belongs to client from request
    :return: "False" if booking belongs to client not from request
    """
    return Booking.objects.filter(client=client_id,
                                  apartment=apartment_id,
                                  check_in_date=client_check_in_date,
                                  check_out_date=client_check_out_date).exists()
