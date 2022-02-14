from datetime import datetime, timedelta

from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse

from apartments.models import Apartment
from accounts.models import ClientUser


class BookingViewApiTestCase(APITestCase):

    def setUp(self):
        """Create client and apartment in test database"""
        apartment_data = dict(
            uuid="e60aced9666b11ec8b03744ca19f6795",
            title="title",
            price=111,
            lat=111,
            lon=111,
            description="description",
            feature={'guests': 2, 'bedrooms': 1, 'beds': 3, 'bathrooms': 2}
        )
        self.user = ClientUser.objects.create_user(email="user1@test.com", password="password1")
        self.client = APIClient()
        self.apartment = Apartment.objects.create(**apartment_data)

    def test_post_request(self):
        """Test POST request for apartment booking"""
        booking_data = dict(
            num_of_persons=2,
            comment="comment",
            check_in_date=datetime.today().strftime('%Y-%m-%d'),
            check_out_date=(datetime.today() + timedelta(days=2)).strftime('%Y-%m-%d'),
            idempotency_key="e60aced9666b11ec8b03744ca19f6797"
        )
        self.client.force_authenticate(self.user)
        apartment_id = self.apartment.id
        url = reverse("booking", args=[apartment_id])
        # check apartment booking
        response = self.client.post(url, data=booking_data, format="json")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        # check unique idempotency_key
        response = self.client.post(url, data=booking_data, format="json")
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

        # check apartment is not available for booking
        booking_data.update(idempotency_key="e60aced9666b11ec8b03744ca19f6791")
        response = self.client.post(url, data=booking_data, format="json")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
