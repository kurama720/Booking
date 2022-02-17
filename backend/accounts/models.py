import uuid

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
    avatar = models.ForeignKey('Avatar', on_delete=models.SET_NULL, null=True, related_name='client_user', blank=True)

    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'

    def set_avatar(self, avatar):
        """Method for setting avatar for user"""
        self.avatar = Avatar.upload_avatar(image=avatar)


class BusinessClientUser(ClientUser):
    organization_name = models.CharField(max_length=60, name='organization_name', unique=True)

    class Meta:
        verbose_name = 'BusinessClient'
        verbose_name_plural = 'BusinessClients'
        ordering = ('organization_name', )

    def __str__(self):
        return self.organization_name


def upload_to(instance, filename):
    """Create path to directory which stores avatars"""
    filename = filename.split('.')
    return f'users/avatar/{str(uuid.uuid4())}.{filename[1]}'


class Avatar(models.Model):
    local_url = models.ImageField(upload_to=upload_to)

    @classmethod
    def upload_avatar(cls, image):
        """Method for avatar creation and saving in the directory"""
        avatar = cls.objects.create(
            local_url=image,
        )
        return avatar
