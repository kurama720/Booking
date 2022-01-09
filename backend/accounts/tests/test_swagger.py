from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class SwaggerApiTestCase(APITestCase):
    def test_get_openapi(self):
        url = reverse("openapi-schema")
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_get_swagger(self):
        url = reverse("swagger-ui")
        response = self.client.get(url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
