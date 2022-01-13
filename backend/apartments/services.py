from django.utils.translation import gettext_lazy as _
import django_filters
from django_filters import NumberFilter, DateTimeFilter, ChoiceFilter, DateRangeFilter

from apartments.models import Apartment, Booking


class ApartmentFilter(django_filters.FilterSet):
    """Filter hotels by lat, lon, created_at and num_of_bedrooms fields"""
    lat = NumberFilter()
    lon = NumberFilter()
    created_at = DateTimeFilter()  # takes date format like YYYY-mm-ddTHH:MM:SS.ffffZ
    num_of_bedrooms = NumberFilter()

    class Meta:
        model = Apartment
        fields = ('lat', 'lon', 'created_at', 'num_of_bedrooms',)


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
    business_client = NumberFilter()

    class Meta:
        model = Booking
        fields = ('check_in_date', 'business_client')

    def __init__(self, data, *args, **kwargs):
        data = data.copy()
        data.setdefault('check_in_date', 'descending')
        super().__init__(data, *args, **kwargs)
