from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from apartments.models import BusinessClientUser, ClientUser


class UserInfoViewApiTestCase(APITestCase):
    def setUp(self):
        """create records in test DB"""
        self.test_business_client = BusinessClientUser.objects.create(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        self.test_user = ClientUser.objects.create(email="test1@email.cim",
                                                   password="test1password",
                                                   first_name="testfirst",
                                                   last_name="testsecond")

    def test_business_user_info(self):
        url = reverse("info")
        token = str(AccessToken().for_user(self.test_business_client))

        response = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(self.test_business_client.organization_name,
                         response.json()["organization_name"])

        self.assertEqual(self.test_business_client.last_name,
                         response.json()["last_name"])

        self.assertEqual(self.test_business_client.first_name,
                         response.json()["first_name"])

    def test_user_info(self):
        url = reverse("info")
        token = str(AccessToken().for_user(self.test_user))

        response = self.client.get(url, HTTP_AUTHORIZATION=f"Bearer {token}")

        self.assertEqual(self.test_user.last_name,
                         response.json()["last_name"])

        self.assertEqual(self.test_user.first_name,
                         response.json()["first_name"])
