from rest_framework_simplejwt.tokens import BlacklistMixin, AccessToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class CustomAccessToken(BlacklistMixin, AccessToken):
    """Class for additional blocking access token on the backend side"""


class AppTokenGenerator(PasswordResetTokenGenerator):
    """Class for generating tokens based on client data"""

    def _make_hash_value(self, user, timestamp):
        return str(user.is_active) + str(user.pk) + str(timestamp)


account_activation_token = AppTokenGenerator()
