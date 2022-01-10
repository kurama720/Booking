from rest_framework import serializers

from apartments.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    """Serializer to serialize data from booking apartments requests"""
    class Meta:
        model = Booking
        fields = ("id", "check_in_date", "check_out_date", "num_of_persons",
                  "comment",  "client", "apartment_id")
