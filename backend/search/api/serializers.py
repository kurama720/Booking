from rest_framework import serializers

from search.models import ApartmentGeoWrapper
from apartments.api.serializers import ApartmentSerializer


class ApartmentGeoWrapperSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentGeoWrapper
        fields = tuple()

    def to_representation(self, instance):
        return ApartmentSerializer(instance.hotel,
                                   context=self.context).data
