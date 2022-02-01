from django.urls import reverse
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode

from accounts.models import ClientUser
from accounts.api.tokens import account_activation_token


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
