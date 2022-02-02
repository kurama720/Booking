import datetime

from django.utils.translation import gettext_lazy as _
from django.db import models
import django_filters
from django_filters import NumberFilter, DateTimeFilter, DateRangeFilter
from django.db.models import Q

from apartments.models import Apartment, Booking


class ApartmentFilter(django_filters.FilterSet):
    """
    Filter apartments by lat, lon, created_at and feature fields.
    Filter apartments by min and max price
    """
    lat = NumberFilter()
    lon = NumberFilter()
    # take date format like YYYY-mm-dd
    check_availability = django_filters.CharFilter(method='filter_check_in_out')
    feature = django_filters.CharFilter(method='filter_feature')  # takes params format like <beds:2,guests:3>
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr='lte')

    class Meta:
        model = Apartment
        fields = ('lat', 'lon', 'feature', 'min_price', 'max_price')
        filter_overrides = {
            models.JSONField: {
                'filter_class': django_filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains'
                }
            }
        }

    def filter_feature(self, queryset, name, value):
        """Filter JSONField"""
        value = value.split(',')
        given_filters: dict[str: int] = {}  # Get filters by splitting , and :
        for f in value:
            f = f.split(':')
            given_filters[f[0]] = int(f[(-1)])
        return queryset.filter(feature__contains=given_filters)

    def filter_check_in_out(self, queryset, name, value: str):
        """
        Get dates from param ?check_availability=YYYY-MM-DD,YYYY-MM-DD.
        Filter by Booking fields check_in_date, check_out_date are not in range of given dates
        """
        date_range = value.split(',')
        # Add one day to check in and subtract one day from check out
        # So client could check in on check out date of another client
        check_in: datetime.date = datetime.date.fromisoformat(date_range[0]) + datetime.timedelta(days=1)
        check_out: datetime.date = datetime.date.fromisoformat(date_range[1]) - datetime.timedelta(days=1)
        return queryset.filter(~Q(bookings__check_in_date__range=(check_in, check_out)) &
                               ~Q(bookings__check_out_date__range=(check_in, check_out)) &
                               ~Q(bookings__check_in_date__lt=check_in,
                                  bookings__check_out_date__gt=check_in) &
                               ~Q(bookings__check_in_date__lt=check_out,
                                  bookings__check_out_date__gt=check_out))


class DateAscendingDescendingFilter(DateRangeFilter):
    """Filter to ascending/descending date filtering"""
    choices = [
        ('ascending', _('Ascending')),
        ('descending', _('Descending')),
    ]

    filters = {'ascending': lambda qs, name: qs.order_by('%s' % name),
               'descending': lambda qs, name: qs.order_by('-%s' % name)
               }


class BookingHistoryFilter(django_filters.FilterSet):
    """Filter books by check_in_date and business_client fields"""
    check_in_date = DateAscendingDescendingFilter()

    class Meta:
        model = Booking
        fields = ('check_in_date',)

    def __init__(self, data, *args, **kwargs):
        data = data.copy()
        data.setdefault('check_in_date', 'descending')
        super().__init__(data, *args, **kwargs)
