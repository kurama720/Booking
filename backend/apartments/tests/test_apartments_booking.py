from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from apartments.models import Apartment
from accounts.models import ClientUser

apartment_data = dict(
    uuid="e60aced9666b11ec8b03744ca19f6795",
    title="title",
    price=111,
    img=None,
    lat=111,
    lon=111,
    description="description",
    num_of_bedrooms=3
)

booking_data = dict(
    num_of_persons=2,
    comment="comment",
    check_in_date="2022-01-14",
    check_out_date="2022-01-16",
    idempotency_key="e60aced9666b11ec8b03744ca19f6797"
)

class BookingViewApiTestCase(APITestCase):

    def setUp(self):
        """Create client and apartment in test database"""
        self.user = ClientUser.objects.create_user(email="user1@test.com", password="password1")
        self.client = APIClient()
        self.apartment = Apartment.objects.create(**apartment_data)

    def test_post_request(self):
        """Test POST request for apartment booking"""
        self.client.force_authenticate(self.user)
        apartment_id = self.apartment.id
        # check apartment booking
        response = self.client.post(f"http://127.0.0.1:8000/apartments/{apartment_id}/book",
                                    data=booking_data, format="json")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        # check unique idempotency_key
        response = self.client.post(f"http://127.0.0.1:8000/apartments/{apartment_id}/book",
                                    data=booking_data, format="json")
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

        # check apartment is not available for booking
        booking_data.update(idempotency_key="e60aced9666b11ec8b03744ca19f6791")
        response = self.client.post(f"http://127.0.0.1:8000/apartments/{apartment_id}/book",
                                    data=booking_data, format="json")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
