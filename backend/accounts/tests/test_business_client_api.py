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


class BusinessClientRegisterViewApiTestCase(APITestCase):
    def test_registration_request(self):
        test_data = dict(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test123password",
            confirm_password="test123password",
            first_name="testfirst",
            last_name="testsecond"
        )

        resp_data = test_data.copy()
        resp_data.pop("password")
        resp_data.pop("confirm_password")

        url = reverse("business_sign_up")
        response = self.client.post(url, data=test_data)

        self.assertEqual(resp_data, response.json())
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)


class BusinessClientSignInViewApiTestCase(APITestCase):
    def test_authorization_request(self):
        test_business_client = BusinessClientUser.objects.create(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            first_name="testfirst",
            last_name="testsecond"
        )
        test_business_client.set_password("test123password")
        test_business_client.save()

        test_data = dict(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test123password",
        )

        url = reverse("business_sign_in")
        response = self.client.post(url, data=test_data)

        self.assertIn("access", response.json())
        self.assertEqual(status.HTTP_200_OK, response.status_code)
