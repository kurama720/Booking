from functools import partial

from django.contrib.gis.geos import Point
from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import HttpResponse
from rest_framework.test import APITestCase

from accounts.models import ClientUser
from cities.models import City


class UploadCityListFileCSV(APITestCase):
    def setUp(self):
        admin = ClientUser.objects.create_superuser(email="superuser@test.com",
                                                    password="admin")
        self.client.login(email=admin.email,
                          password=admin.password)

        self.url = "http://localhost:8000/admin/cities/city/upload-csv/"
        self.uploaded_file = partial(SimpleUploadedFile,
                                     content_type="multipart/form-data")

        self.upload_results_messages_and_data_examples = {
            "success": {"message": "Csv file has been imported",
                        "data": dict(name="test_upload.csv",
                                     content=b"name,lat,lon\nMinsk,10,10"
                                     )},
            "wrong_type": {"message": "You try to upload wrong file type",
                           "data": dict(name="test_upload.txt",
                                        content=b"name,lat,lon\nMinsk,10,10"
                                        )},
            "empty_file": {"message": "You try to upload empty file!",
                           "data": dict(name="test_upload.csv",
                                        content=b""
                                        )},
            "invalid_file_data": {"message": "Csv file data format doesn't fit",
                                  "data": dict(name="test_upload.csv",
                                               content=b"name,lat,lon\nMinsk,Grodno,Borisov"
                                               )},
            "duplicates": {"message": "You try to upload duplicates data in db!",
                           "data": dict(name="test_upload.csv",
                                        content=b"name,lat,lon\nMinsk,10,10"
                                        )},
            "no_headers": {"message": "Csv file has no field name header",
                           "data": dict(name="test_upload.csv",
                                        content=b"Minsk,10,10"
                                        )}
        }

    @staticmethod
    def response_messages_wrapper(response: HttpResponse) -> str:
        """
        FUnction extract current message text from response object
        :param response: wrapping response object with messages inside
        :return: message string
        """
        return str(next(iter(response.context.get("messages"))).message)

    def template_test_method(self, reason: str) -> None:
        """
        Method to unify and simplify test methods code-base.
        It implements necessary test method behavior
        :param reason: situation type
        :return: None
        """
        upload_context = self.upload_results_messages_and_data_examples[reason]
        response = self.client.post(
            self.url,
            data={"csv_upload":
                  self.uploaded_file(**upload_context["data"])
                  })
        self.assertEqual(self.response_messages_wrapper(response),
                         upload_context["message"])

    def test_success_upload(self):
        self.template_test_method("success")

    def test_wrong_file_type(self):
        self.template_test_method("wrong_type")

    def test_wrong_data_upload(self):
        self.template_test_method("invalid_file_data")

    def test_empty_file_upload(self):
        self.template_test_method("empty_file")

    def test_file_no_headers_upload(self):
        self.template_test_method("no_headers")

    def test_duplicates_data_upload(self):
        City.objects.create(name="Minsk", location=Point(10, 10))
        self.template_test_method("duplicates")
