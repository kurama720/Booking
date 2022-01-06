from rest_framework import viewsets, mixins
from django_filters.rest_framework import DjangoFilterBackend

from apartments.models import Apartment
from apartments.services import ApartmentFilter
from apartments.api.serializers import ApartmentSerializer


class ApartmentListView(viewsets.ModelViewSet, mixins.ListModelMixin):

    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('lat', 'lon', 'created_at', 'num_of_bedrooms',)
    filter_class = ApartmentFilter
