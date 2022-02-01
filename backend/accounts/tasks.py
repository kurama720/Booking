from django.core.mail import EmailMessage
from celery import shared_task


@shared_task
def send_mail(data: dict) -> None:
    """
    Send email with client parameters

    :param data: client data to send
    :return: None
    """
    email = EmailMessage(
        subject=data['email_subject'], body=data['email_body'], to=[data['to_email']]
    )
    email.send()
