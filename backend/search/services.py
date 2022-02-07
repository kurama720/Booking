import datetime

import django_filters
from django.db.models import Q

from rest_framework import pagination
from rest_framework.exceptions import NotFound

from search.models import ApartmentGeoWrapper


class ApartmentGeoWrapperSearchFilter(django_filters.FilterSet):
    check_availability = django_filters.CharFilter(method="filter_check_in_out_filter")
    feature = django_filters.CharFilter(method="filter_feature")

    class Meta:
        model = ApartmentGeoWrapper
        fields = tuple()

    def filter_feature(self, queryset, name, value):
        """Filter JSONField"""
        value = value.split(',')
        given_filters: dict[str: int] = {}  # Get filters by splitting , and :
        for f in value:
            f = f.split(':')
            try:
                given_filters[f[0]] = int(f[(-1)])
            except ValueError:
                raise NotFound
        return queryset.filter(hotel__feature__contains=given_filters)

    def filter_check_in_out_filter(self, queryset, name, value):
        """
        Get dates from param ?check_availability=YYYY-MM-DD,YYYY-MM-DD.
        Filter by Booking fields check_in_date, check_out_date are not in range of given dates
        """
        date_range = value.split(',')
        # Add one day to check in and subtract one day from check out
        # So client could check in on check out date of another client
        try:
            check_in = datetime.date.fromisoformat(date_range[0]) + datetime.timedelta(days=1)
            check_out = datetime.date.fromisoformat(date_range[1]) - datetime.timedelta(days=1)
        except ValueError:
            raise NotFound
        return queryset.filter(~Q(hotel__bookings__check_in_date__range=(check_in, check_out)) &
                               ~Q(hotel__bookings__check_out_date__range=(check_in, check_out)) &
                               ~Q(hotel__bookings__check_in_date__lt=check_in,
                                  hotel__bookings__check_out_date__gt=check_in) &
                               ~Q(hotel__bookings__check_in_date__lt=check_out,
                                  hotel__bookings__check_out_date__gt=check_out))


class CustomPagination(pagination.PageNumberPagination):
    page_size_query_param = 'page_size'
    max_page_size = 30
