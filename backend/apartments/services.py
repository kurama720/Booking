from django.utils.translation import gettext_lazy as _
from django.db import models
import django_filters
from django_filters import NumberFilter, DateTimeFilter, DateRangeFilter

from apartments.models import Apartment, Booking


class ApartmentFilter(django_filters.FilterSet):
    """Filter hotels by lat, lon, created_at and num_of_bedrooms fields"""
    lat = NumberFilter()
    lon = NumberFilter()
    created_at = DateTimeFilter()  # takes date format like YYYY-mm-ddTHH:MM:SS.ffffZ
    feature = django_filters.CharFilter(method='filter_feature')  # takes params format like <beds:2,guests:3>

    class Meta:
        model = Apartment
        fields = ('lat', 'lon', 'created_at', 'feature')
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
