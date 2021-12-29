from django.contrib.auth.password_validation import validate_password
from drf_spectacular.utils import extend_schema_serializer, OpenApiExample
from rest_framework.validators import UniqueValidator
from accounts.models import ClientUser
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


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
            first_name=validated_data['first_name'],  # Assign first name
            last_name=validated_data['last_name'],  # Assign last name
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
