from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import ClientUser


class LogoutApiTestCase(APITestCase):
    def setUp(self):
        url = reverse('sign_up')
        user_data = {
            "email": "test1@email.com",
            "password": "test12password",
            "confirm_password": "test12password",
            "first_name": "testfirst",
            "last_name": "testsecond"
        }

        response = self.client.post(url, data=user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cannot_login_with_unverified_email(self):
        url = reverse('sign_in')
        user_data = {
            "email": "test1@email.com",
            "password": "test12password",
        }
        response = self.client.post(url, data=user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_can_login_after_verification(self):
        url = reverse('verify-email')
        user_data = {
            "email": "test1@email.com",
        }
        response = self.client.post(url, data=user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        email = user_data['email']
        user = ClientUser.objects.get(email=email)
        user.is_active = True
        user.save()

        url = reverse('sign_in')
        user_data = {
            "email": "test1@email.com",
            "password": "test12password",
        }
        response = self.client.post(url, data=user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
