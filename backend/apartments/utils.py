import datetime
import random
from django.db.models import Func
from django.template.loader import render_to_string

from accounts.models import ClientUser


class Round(Func):
    function = "ROUND"
    template = "%(function)s(%(expressions)s::numeric, 1)"


def create_mail_for_confirm_booking(check_in_date: datetime.date, check_out_date: datetime.date,
                                    apartment, client: ClientUser, num_of_persons: int, action: str) -> dict:
    client = ClientUser.objects.get(email=client.email)
    confirm_code = random.randint(1000, 9999)
    price = apartment.price * (check_out_date - check_in_date).days
    context = {'client': client, 'apartment': apartment, 'check_in_date': check_in_date,
               'check_out_date': check_out_date, 'action': action, 'num_of_persons': num_of_persons,
               'confirm_code': confirm_code, 'price': price, 'bedrooms': apartment.feature['bedrooms'],
               'bathrooms': apartment.feature['bathrooms'], 'beds': apartment.feature['beds']}
    email_body = render_to_string('email/confirm_and_cancel_book.html', context)
    data = {'email_body': email_body, 'to_email': client.email,
            'email_subject': f'{action} of your booking'}
    return data
