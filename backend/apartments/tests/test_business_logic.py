from random import randint

from PIL import Image

from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import HttpRequest
from django.test import TestCase

from rest_framework.exceptions import ValidationError
from rest_framework.request import Request

from apartments.business_logic import check_files_in_request
from apartments.models import Apartment, ApartmentsImage
from accounts.models import BusinessClientUser

apartment_data = {
            "title": "some title",
            "price": 120,
            "lat": 21,
            "lon": 299,
            "description": "some description",
        }


class BusinessLogicTestCase(TestCase):
    def setUp(self):
        """create records in test DB"""
        self.test_business_client = BusinessClientUser.objects.create(
            organization_name="Someone Inc.",
            email="test2@email.cim",
            password="test2password",
            first_name="testtwofirst",
            last_name="testtwosecond"
        )
        self.test_apartment = Apartment.objects.create(**apartment_data,
                                                       business_account=self.test_business_client)

        new_test_image = Image.new("RGB", (300, 300), color=255)
        new_test_image.save("New_test_image.jpg")
        self.image_to_upload = SimpleUploadedFile(name="New_test_image.jpg",
                                                  content=open("New_test_image.jpg",
                                                               "rb").read(),
                                                  content_type="image/jpeg"
                                                  )

    def test_add_images_to_apartments_function_with_one_image(self):
        self.test_apartment.add_images_to_apartments(ApartmentsImage,
                                                     [self.image_to_upload])

        self.assertEqual(1, len(self.test_apartment.img_content.all()))
        self.assertIn(self.image_to_upload.name[:-4],
                      self.test_apartment.img_content.all()[0].img.name)

    def test_add_images_to_apartments_function_with_many_image(self):
        self.test_apartment.add_images_to_apartments(ApartmentsImage,
                                                     [self.image_to_upload for _ in range(5)])

        self.assertEqual(5, len(self.test_apartment.img_content.all()))
        self.assertIn(self.image_to_upload.name[:-4],
                      self.test_apartment.img_content.all()[randint(0, 4)].img.name)

    def test_check_files_in_request(self):
        request = Request(HttpRequest())
        request.FILES.setlist("img_content", [self.image_to_upload for _ in range(5)])
        result = check_files_in_request(request)

        self.assertNotEqual(len(result), 0)

        signal = 0
        request.FILES.setlist("img_content", [self.image_to_upload for _ in range(10)])
        try:
            check_files_in_request(request)
        except ValidationError:
            signal = 1
        self.assertEqual(signal, 1)
