from rest_framework import serializers

from apartments.models import Apartment


class ApartmentSerializer(serializers.ModelSerializer):
    """
    Serializer class for models.Apartment
    """
    class Meta:
        model = Apartment
        fields = "__all__"
        read_only_fields = ["created_at", "rating", "business_account"]
