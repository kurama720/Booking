from rest_framework import serializers

from apartments.models import Apartment, Booking


class ApartmentSerializer(serializers.ModelSerializer):
    """
    Serializer class for models.Apartment
    """
    class Meta:
        model = Apartment
        fields = "__all__"
        read_only_fields = ["created_at", "rating", "business_account"]


class BookingSerializer(serializers.ModelSerializer):
    """Serializer to serialize data from booking apartments requests"""
    class Meta:
        model = Booking
        fields = ("num_of_persons", "comment", "check_in_date", "check_out_date",
                  "idempotency_key")

        def validate(self, attrs):
            if Booking.objects.filter(idempotency_key=attrs["idempotency_key"]):
                raise serializers.ValidationError("idempotency_key not unique")
            return super().validate(attrs)
