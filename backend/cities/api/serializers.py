from rest_framework import serializers

from cities.models import City


class CitySerializer(serializers.ModelSerializer):
    """
    Serializer class for models.City
    """
    class Meta:
        model = City
        fields = ("name", "lat", "lon")
