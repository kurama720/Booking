from django.core.mail import EmailMessage


class Util:
    """Class for send message"""
    @staticmethod
    def send_mail(data):
        email = EmailMessage(
            subject=data['email_subject'], body=data['email_body'], to=[data['to_email']]
        )
        email.send()
