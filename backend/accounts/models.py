from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from accounts.managers import CustomUserManager
from accounts.validators import first_name_validator
from accounts.validators import last_name_validator


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, name='email')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class ClientUser(User):
    first_name = models.CharField(max_length=32, name='first_name', validators=[first_name_validator])
    last_name = models.CharField(max_length=32, name='last_name', validators=[last_name_validator])

    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'


# Test model to realize many_to_one apartment relation. Need to overwrite.
class BusinessClientUser(ClientUser):
    organization_name = models.CharField(max_length=60, name='organization_name', unique=True)

    class Meta:
        verbose_name = 'BusinessClient'
        verbose_name_plural = 'BusinessClients'

    def __str__(self):
        return self.organization_name
