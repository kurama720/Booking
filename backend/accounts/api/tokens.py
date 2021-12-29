from rest_framework_simplejwt.tokens import BlacklistMixin, AccessToken


class CustomAccessToken(BlacklistMixin, AccessToken):
    """Class for additional blocking access token on the backend side"""
