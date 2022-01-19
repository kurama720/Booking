from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse

from apartments.models import Apartment
from accounts.models import ClientUser


class ReviewsViewApiTestCase(APITestCase):

    def setUp(self):
        """Create client and apartment in test database"""
        apartment_data = dict(
            uuid="e60aced9666b11ec8b03744ca19f6795",
            title="title",
            price=111,
            img=None,
            lat=111,
            lon=111,
            description="description",
        )
        self.user = ClientUser.objects.create_user(email="user1@test.com", password="password1")
        self.client = APIClient()
        self.apartment = Apartment.objects.create(**apartment_data)

    def test_post_get_requests(self):
        """Test requests for apartment reviews"""
        test_review1 = dict(
            comment="comment1",
            rate=5
        )
        test_review2 = dict(
            comment="comment2",
            rate=4
        )
        self.client.force_authenticate(self.user)
        apartment_id = self.apartment.id
        url = reverse("reviews", args=[apartment_id])
        # add apartment review
        response = self.client.post(url, data=test_review1, format="json")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        # get apartment reviews information
        self.client.post(url, data=test_review2, format="json")
        response = self.client.get(url)
        self.assertEqual(4.5, response.data.get("rate"))
