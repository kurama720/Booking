from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import BusinessClientUser


class BusinessClientViewApiTestCase(APITestCase):
    def test_get_uniqueness(self):
        test_business_client = BusinessClientUser.objects.create(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        url = reverse("businessclientuser-detail", args=[test_business_client.id])
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        response = self.client.post(url)
        self.assertEqual(status.HTTP_405_METHOD_NOT_ALLOWED, response.status_code)
