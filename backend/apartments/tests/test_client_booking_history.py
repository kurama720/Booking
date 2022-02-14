from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse

from apartments.models import Apartment
from accounts.models import ClientUser


class BookingViewApiTestCase(APITestCase):

    def setUp(self):
        """Create client, apartment and booking in test database"""
        apartment_data = dict(
            uuid="e60aced9666b11ec8b03744ca19f6795",
            title="title",
            price=111,
            lat=111,
            lon=111,
            description="description",
            feature={'guests': 2, 'bedrooms': 1, 'beds': 3, 'bathrooms': 2}
        )
        self.apartment = Apartment.objects.create(**apartment_data)

        self.user = ClientUser.objects.create_user(email="user1@test.com", password="password1")
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        booking_data1 = dict(
            num_of_persons=2,
            comment="comment",
            check_in_date=datetime.today().strftime('%Y-%m-%d'),
            check_out_date=(datetime.today() + timedelta(days=2)).strftime(
                '%Y-%m-%d'),
            idempotency_key="e60aced9666b11ec8b03744ca19f6797"
        )
        booking_data2 = dict(
            num_of_persons=2,
            comment="comment",
            check_in_date=(datetime.today() + timedelta(days=3)).strftime(
                '%Y-%m-%d'),
            check_out_date=(datetime.today() + timedelta(days=4)).strftime(
                '%Y-%m-%d'),
            idempotency_key="e60aced9666b11ec8b03744ca19f6792"
        )
        apartment_id = self.apartment.id
        url = reverse("booking", args=[apartment_id])
        self.client.post(url, data=booking_data1, format="json")
        self.client.post(url, data=booking_data2, format="json")

    def test_client_booking_history(self):
        """Test GET request for client booking history"""
        url = reverse("client_booking_history")
        response = self.client.get(url)
        self.assertEqual(len(response.json()), 2)
