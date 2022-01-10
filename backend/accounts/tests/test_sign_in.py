from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import ClientUser


class SignInApiTestCase(APITestCase):

    def setUp(self):

        self.user = ClientUser.objects.create_user(email="user@example.com", password="superUser22")

        self.valid_data = {
            "email": "user@example.com",
            "password": "superUser22"
        }

        self.nonexistent_email_in_data = {
            "email": "admin@admin.com",
            "password": "12345678"
        }

        self.invalid_password_in_data = {
            "email": "user@example.com",
            "password": "asfgdagertq34G4RKA"
        }

    def test_post_sign_in(self):
        url = reverse("sign_in")

        response = self.client.post(url, data=self.valid_data, format="json")
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        response = self.client.post(url, data=self.nonexistent_email_in_data, format="json")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

        response = self.client.post(url, data=self.invalid_password_in_data, format="json")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
