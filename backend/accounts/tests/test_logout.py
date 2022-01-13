from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from accounts.models import ClientUser
from accounts.models import BusinessClientUser


class LogoutApiTestCase(APITestCase):
    def test_post_logout(self):
        url = reverse("log_out")
        user = ClientUser.objects.create(email="test1@email.cim",
                                         password="test1password",
                                         first_name="testfirst",
                                         last_name="testsecond")

        token = str(AccessToken().for_user(user))
        response = self.client.post(url, data={"text": "logout"}, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        response = self.client.get(url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

        business_client = BusinessClientUser.objects.create(email="test2@email.cim",
                                                            password="test123password",
                                                            first_name="testfirst",
                                                            last_name="testsecond",
                                                            organization_name="Feel Good Inc.")

        token = str(AccessToken().for_user(business_client))
        response = self.client.post(url, data={"text": "logout"}, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        response = self.client.get(url)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
