from django.contrib.auth.password_validation import validate_password
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accounts.models import ClientUser, BusinessClientUser

from apartments.api.serializers import ApartmentSerializer, BookingSerializer


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=ClientUser.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = ClientUser
        fields = ('email', 'password', 'confirm_password', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = ClientUser.objects.create(
            email=validated_data['email'],  # Assign email
            first_name=validated_data['first_name'].capitalize(),  # Assign first name
            last_name=validated_data['last_name'].capitalize(),  # Assign last name
        )

        user.set_password(validated_data['password'])  # Assign password
        user.save()
        return user


@extend_schema_serializer(
    examples=[
        OpenApiExample('Response', value={'access': 'string'}, response_only=True)
    ]
)
class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    """Override the serializer library class to remove the refresh token"""

    def validate(self, attrs):
        """Remove the refresh token from the output dictionary"""
        data = super().validate(attrs)
        data.pop("refresh")
        return data


class CustomTokenDestroySerializer(serializers.Serializer):
    """Custom serializer to serialize data from post-request for logout"""
    text = serializers.CharField(write_only=True)
    status = serializers.CharField(read_only=True)


class BusinessClientSerializer(serializers.ModelSerializer):
    """
    Serializer class for models.BusinessClientUser representation
    """
    apartments = ApartmentSerializer(many=True)
    booking = BookingSerializer(many=True)

    class Meta:
        model = BusinessClientUser
        fields = ["id", "apartments", "booking"]


class BusinessClientRegisterSerializer(RegisterSerializer):
    """
    Serializer class for models.BusinessClientUser register
    """
    class Meta:
        model = BusinessClientUser
        fields = ('email', 'password', 'confirm_password', 'first_name', 'last_name', 'organization_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'organization_name': {'required': True}
        }

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        raw_password = validated_data.pop("password")
        business_client = BusinessClientUser.objects.create(**validated_data)
        business_client.set_password(raw_password)
        business_client.save()
        return business_client


class BusinessClientSignInSerializer(CustomTokenObtainSerializer):
    """
    serializer class for business-client sign in
    """
    organization_name = serializers.CharField(max_length=60, required=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        is_email_valid = BusinessClientUser.objects.filter(
            organization_name=attrs.get("organization_name"),
            email=attrs.get("email")).exists()
        if is_email_valid:
            return data
        raise AuthenticationFailed(
            self.error_messages['no_active_account'],
            'no_active_account',)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    """Serializer for request reset password"""
    email = serializers.EmailField(required=True)

    class Meta:
        fields = ['email']
