import django_filters
from django_filters import NumberFilter, DateTimeFilter

from apartments.models import Apartment


class ApartmentFilter(django_filters.FilterSet):
    """Filter hotels by lat, lon, created_at and num_of_bedrooms fields"""
    lat = NumberFilter()
    lon = NumberFilter()
    created_at = DateTimeFilter()  # takes date format like YYYY-mm-ddTHH:MM:SS.ffffZ
    num_of_bedrooms = NumberFilter()

    class Meta:
        model = Apartment
        fields = ('lat', 'lon', 'created_at', 'num_of_bedrooms',)
