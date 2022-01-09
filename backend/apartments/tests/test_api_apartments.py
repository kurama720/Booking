from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from accounts.models import BusinessClientUser
from apartments.models import Apartment
from accounts.models import ClientUser

# change to current image path
image_path = "images/IMG-1.jpg"

# test data for post-requests body
post_data = dict(
    title="some title",
    price=120,
    img=SimpleUploadedFile(name="test_image.jpg",
                           content=open(image_path, "rb").read(),
                           content_type="image/jpeg"),
    lat=21,
    lon=299,
    description="some description",
    num_of_bedrooms=2,
)


class ApartmentViewApiTestCase(APITestCase):
    def test_get_list(self):
        url = reverse("apartment-list")
        response = self.client.get(url)

        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_post_access(self):
        test_data = post_data.copy()
        test_business_client = BusinessClientUser.objects.create(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )

        token = str(AccessToken().for_user(test_business_client))

        url = reverse("apartment-list")
        response = self.client.post(url, data=test_data, HTTP_AUTHORIZATION=f"Bearer {token}")

        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(test_business_client.id, response.json().get("business_account"))

        test_data.update(business_account=test_business_client.id+10)
        response = self.client.post(url, data=test_data, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_post_reject(self):
        url = reverse("apartment-list")
        response = self.client.post(url, data=post_data)
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

        test_client_user = ClientUser.objects.create(
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        token = str(AccessToken().for_user(test_client_user))

        response = self.client.post(url, data=post_data, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_update_access(self):
        test_update_data = post_data.copy()
        test_business_client = BusinessClientUser.objects.create(
            organization_name="Someone Inc.",
            email="test2@email.cim",
            password="test2password",
            first_name="testtwofirst",
            last_name="testtwosecond"
        )
        token = str(AccessToken().for_user(test_business_client))

        test_apartment = Apartment.objects.create(**test_update_data, business_account=test_business_client)

        test_update_data["title"] = "new title"
        new_image_path = "images/IMG-3.jpg"
        test_update_data["img"] = SimpleUploadedFile(name="test_image.jpg",
                                                     content=open(new_image_path, "rb").read(),
                                                     content_type="image/jpeg")

        url = reverse("apartment-detail", args=[test_apartment.id])
        response = self.client.put(url, data=test_update_data, HTTP_AUTHORIZATION=f"Bearer {token}")

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(test_business_client.id, response.json().get("business_account"))
