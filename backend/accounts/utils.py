from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.encoding import smart_bytes
from django.utils.html import strip_tags
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings

from accounts.models import ClientUser
from accounts.api.tokens import account_activation_token


def create_mail_for_reset_password(email: str) -> dict:
    user = ClientUser.objects.get(email=email)
    uid64 = urlsafe_base64_encode(smart_bytes(user.id))
    token = PasswordResetTokenGenerator().make_token(user)
    abs_url = f"{settings.RESET_URL}/{uid64}/{token}/"
    context = {'email': user.email, 'abs_url': abs_url}
    email_body = strip_tags(render_to_string('email/reset_password.html', context))
    data = {'email_body': email_body, 'to_email': email, 'email_subject': 'Reset your password'}
    return data


def create_verify_mail_data(user_data: dict, current_site: str,
                            user: ClientUser = None) -> dict:
    """
    Create data for confirm email address

    :param user_data: client data from request
    :param current_site: site domain
    :param user: client from request
    :return: data for confirm email address in dict format
    """
    if not user:
        user = ClientUser.objects.get(email=user_data['email'])
    uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
    token = account_activation_token.make_token(user)
    relative_link = reverse('verify-email')
    abs_url = f'http://{current_site}{relative_link}?uidb64={uidb64}&token={token}'
    email_body = f'Hi, {user.first_name}. Use the link below to verify your email \n{abs_url}'
    data = {'email_body': email_body, 'to_email': user.email,
            'email_subject': 'Verify your email'}
    return data
