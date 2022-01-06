from rest_framework import serializers

from apartments.models import Apartment


class ApartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Apartment
        fields = ('title', 'price', 'img', 'description', 'rating', 'lat', 'lon', 'created_at', 'num_of_bedrooms',)
