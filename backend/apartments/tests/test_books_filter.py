import uuid

from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APITestCase

from apartments.models import Booking, BusinessClientUser, ClientUser, Apartment
from rest_framework_simplejwt.tokens import AccessToken

url = reverse("book_history")


class BookingHistoryViewApiTestCase(APITestCase):
    check_in_date = timezone.now() + timezone.timedelta(days=5)

    def setUp(self):
        """create records in test DB"""
        setup_business_client_data = dict(
            id=12,
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        self.test_business_client_1 = BusinessClientUser.objects.create(
            **setup_business_client_data)

        setup_business_client_data.update(id=13,
                                          organization_name="Test Inc.",
                                          email="test@email2.cim")

        self.test_business_client_2 = BusinessClientUser.objects.create(
            **setup_business_client_data)

        test_user = ClientUser.objects.create(email="test1@email.cim",
                                              password="test1password",
                                              first_name="testfirst",
                                              last_name="testsecond")

        test_apartments = Apartment.objects.create(title="Test Hotel 1",
                                                   price=100,
                                                   lat=10,
                                                   lon=20,
                                                   description="The first test hotel",
                                                   feature=dict(),
                                                   rating=5)
        test_obj_data = dict(
            idempotency_key=uuid.uuid4(),
            num_of_persons=5,
            check_in_date=str(timezone.now().date()),
            check_out_date=str(timezone.now().date()),
            comment="test comment",
            client=test_user,
            apartment=test_apartments,
            business_client=self.test_business_client_1
        )

        Booking.objects.create(**test_obj_data)

        test_obj_data.update(check_in_date=self.check_in_date,
                             check_out_date=self.check_in_date + timezone.timedelta(days=10),
                             idempotency_key=uuid.uuid4())

        test_obj_data["idempotency_key"] = uuid.uuid4()

        Booking.objects.create(**test_obj_data)

        test_obj_data.update(business_client=self.test_business_client_2,
                             idempotency_key=uuid.uuid4(),
                             check_in_date=self.check_in_date + timezone.timedelta(days=100),
                             check_out_date=self.check_in_date + timezone.timedelta(days=110)
                             )

        Booking.objects.create(**test_obj_data)

    def test_business_client_access(self):
        token = str(AccessToken().for_user(self.test_business_client_1))
        request = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(2, len(request.json()))

        token = str(AccessToken().for_user(self.test_business_client_2))
        request = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(1, len(request.json()))

    def test_check_in_date_filter(self):
        token = str(AccessToken().for_user(self.test_business_client_1))
        request = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(str(self.check_in_date.date()), request.json()[0].get("check_in_date"))

        request = self.client.get(url,
                                  data={"check_in_date": "ascending"},
                                  HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(str(timezone.now().date()), request.json()[0].get("check_in_date"))

        request = self.client.get(url,
                                  data={"check_in_date": "descending"},
                                  HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(str(self.check_in_date.date()), request.json()[0].get("check_in_date"))
