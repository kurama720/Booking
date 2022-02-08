from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from search.api.serializers import ApartmentGeoWrapperSerializer
from search.models import ApartmentGeoWrapper
from search.services import ApartmentGeoWrapperSearchFilter, CustomPagination

from apartments.api.serializers import ApartmentSerializer


@extend_schema(
    responses={200: ApartmentSerializer}
)
class ApartmentSearchView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = ApartmentGeoWrapperSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ("check_availability", "feature")
    filter_class = ApartmentGeoWrapperSearchFilter
    pagination_class = CustomPagination

    def get_queryset(self):
        model = ApartmentGeoWrapper
        kwargs = {
            name: value for name, value in
            self.request.GET.items()
            if name in ("lat", "lon", "radius")
        }
        if len(kwargs) == 3:
            return model.get_objects_inside_circle(
                    **kwargs
                )
        return model.objects.none()
