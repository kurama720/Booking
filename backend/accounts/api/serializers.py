from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from accounts.models import ClientUser


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
