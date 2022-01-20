from uuid import uuid4

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from PIL import Image

from accounts.models import BusinessClientUser, ClientUser
from apartments.models import Apartment, ApartmentsImage


test_image = Image.new("RGB", (700, 900), color=150)
test_image.save("Test_image.jpg")
image_to_upload = SimpleUploadedFile(name="Test_image.jpg",
                                   content=open("Test_image.jpg", "rb").read(),
                                   content_type="image/jpeg"
                                   )

# test data for post-requests body
post_data = {
    "title": "some title",
    "price": 120,
    "lat": 21,
    "lon": 299,
    "description": "some description",
}


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
        images = [image_to_upload]
        test_data["img_content"] = images
        url = reverse("apartment-list")
        response = self.client.post(url,
                                    data=test_data,
                                    HTTP_AUTHORIZATION=f"Bearer {token}",
                                    )

        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(test_business_client.id, response.json().get("business_account"))

        test_data.update(business_account=test_business_client.id+10)
        response = self.client.post(url, data=test_data, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_post_reject(self):
        url = reverse("apartment-list")
        response = self.client.post(url,
                                    data=post_data,
                                    )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

        test_client_user = ClientUser.objects.create(
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        token = str(AccessToken().for_user(test_client_user))

        response = self.client.post(url,
                                    data=post_data,
                                    HTTP_AUTHORIZATION=f"Bearer {token}",
                                    )
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
        new_test_image = Image.new("RGB", (300, 300), color=255)
        new_test_image.save("New_test_image.jpg")
        image_to_upload_2 = SimpleUploadedFile(name="New_test_image.jpg",
                                               content=open("New_test_image.jpg",
                                                            "rb").read(),
                                               content_type="image/jpeg"
                                               )

        images = [image_to_upload, image_to_upload_2]
        test_update_data["img_content"] = images

        url = reverse("apartment-detail", args=[test_apartment.id])
        response = self.client.put(url,
                                   data=test_update_data,
                                   HTTP_AUTHORIZATION=f"Bearer {token}",
                                   )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(test_business_client.id, response.json().get("business_account"))
