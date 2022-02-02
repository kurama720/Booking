from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class ResetPasswordTestCase(APITestCase):

    def test_post_email_for_reset_password(self):
        url = reverse('password_reset_email')

        response = self.client.post(url, data={"email": "example@user.com"}, format="json")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
