import datetime

from rest_framework import serializers

from apartments.models import Apartment, Booking, ApartmentReview, ApartmentsImage


class ApartmentsImageSerializer(serializers.ModelSerializer):
    """
    Serializer class for models.ApartmentImages
    """
    class Meta:
        model = ApartmentsImage
        fields = ("img", )

    def to_representation(self, value):
        try:
            url = value.img.url
        except AttributeError:
            return None
        request = self.context.get('request', None)
        if request is not None:
            return request.build_absolute_uri(url)
        return url


class ApartmentSerializer(serializers.ModelSerializer):
    """
    Serializer class for models.Apartment
    """
    img_content = ApartmentsImageSerializer(many=True,
                                            required=False)

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
        fields = ("comment", "rate")


class PriceAnalyticSerializer(serializers.Serializer):
    """Serializer for price-analytic endpoint data"""
    flat = serializers.ListField(required=True,
                                 max_length=2,
                                 min_length=2,
                                 child=serializers.ListField(
                                     max_length=2,
                                     min_length=2,
                                     child=serializers.FloatField()
                                 ))
    prices = serializers.ListField(read_only=True)

    def validate(self, attrs):
        flat = attrs.get("flat")
        if (flat[0][0] > flat[1][0] or
                flat[0][1] > flat[1][1]):
            raise serializers.ValidationError({"flat": ["Invalid coordinates value!"]})
        return super().validate(attrs)
