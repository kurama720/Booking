import datetime

from rest_framework import serializers

from apartments.models import Apartment, Booking, ApartmentReview


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
        if attrs['check_in_date'] < datetime.date.today():
            raise serializers.ValidationError({'check_in_date': "Apartment is not available for booking"})
        if attrs['check_out_date'] <= attrs['check_in_date']:
            raise serializers.ValidationError({'check_out_date': "Check-out date must be later than check-in date"})
        return super().validate(attrs)


class ReviewsSerializer(serializers.ModelSerializer):
    """Serializer to serialize data from apartments reviews requests"""
    class Meta:
        model = ApartmentReview
        fields = ("comment", "rating")
