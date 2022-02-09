from django.urls import reverse
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator


from accounts.models import ClientUser
from accounts.api.tokens import account_activation_token


def create_mail_for_reset_password(email: str) -> dict:
    user = ClientUser.objects.get(email=email)
    uid64 = urlsafe_base64_encode(smart_bytes(user.id))
    token = PasswordResetTokenGenerator().make_token(user)
    relative_link = reverse('password-reset-confirm', kwargs={'uid64': uid64, 'token': token})
    abs_url = f"https://yoho.by{relative_link}"
    email_body = f"Hello {user.email}. Use link below to reset your password \n {abs_url}"
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
