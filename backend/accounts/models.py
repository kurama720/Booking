from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives

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


class BusinessClientUser(ClientUser):
    organization_name = models.CharField(max_length=60, name='organization_name', unique=True)

    class Meta:
        verbose_name = 'BusinessClient'
        verbose_name_plural = 'BusinessClients'
        ordering = ('organization_name', )

    def __str__(self):
        return self.organization_name


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'),
                                                   reset_password_token.key)

    msg = EmailMultiAlternatives("Password Reset for yoho.by", email_plaintext_message, "yoho.by", [reset_password_token.user.email])
    msg.send()