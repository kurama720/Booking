from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APITestCase

from apartments.models import Booking, BusinessClientUser, ClientUser, Apartment


url = reverse("book_history")


class BookingHistoryViewApiTestCase(APITestCase):
    def setUp(self):
        """create records in test DB"""
        test_business_client = BusinessClientUser.objects.create(
            id=1,
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        test_user = ClientUser.objects.create(email="test1@email.cim",
                                              password="test1password",
                                              first_name="testfirst",
                                              last_name="testsecond")

        test_apartments = Apartment.objects.create(title="Test Hotel 1",
                                                   price=100,
                                                   img=None,
                                                   lat=10,
                                                   lon=20,
                                                   description="The first test hotel",
                                                   num_of_bedrooms=2,
                                                   rating=5)
        test_obj_data = dict(
            num_of_persons=5,
            comment="test comment",
            client=test_user,
            apartment=test_apartments,
            business_client=test_business_client
        )

        Booking.objects.create(**test_obj_data)

        test_obj_data.update({"check_in_date": "2023-01-01",
                              "check_out_date": "2023-01-10"})

        Booking.objects.create(**test_obj_data)

    def test_business_client_filter(self):
        request = self.client.get(url, data={"business_client": 1})
        self.assertEqual(2, len(request.json()))

        request = self.client.get(url, data={"business_client": 2})
        self.assertEqual(0, len(request.json()))

    def test_check_in_date_filter(self):
        request = self.client.get(url)
        self.assertEqual("2023-01-01", request.json()[0].get("check_in_date"))

        request = self.client.get(url, data={"check_in_date": "ascending"})
        self.assertEqual(str(timezone.now().date()), request.json()[0].get("check_in_date"))

        request = self.client.get(url, data={"check_in_date": "descending"})
        self.assertEqual("2023-01-01", request.json()[0].get("check_in_date"))