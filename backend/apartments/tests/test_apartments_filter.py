import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apartments.models import Apartment


class ApartmentsTest(APITestCase):
    """Integration tests for app apartments"""

    def setUp(self):
        """Create test hotels in test database"""
        Apartment.objects.create(title='Test Hotel 1', price=100, img=None, lat=10, lon=20,
                                 description='The first test hotel', num_of_bedrooms=2, rating=5,)
        Apartment.objects.create(title='Test Hotel 2', price=80, img=None, lat=30, lon=40,
                                 description='The second test hotel', num_of_bedrooms=2, rating=4,)
        Apartment.objects.create(title='Test Hotel 3', price=50, img=None, lat=40, lon=50,
                                 description='The third test hotel', num_of_bedrooms=4, rating=2,
                                 created_at='2022-01-05T15:21:51.480331Z')

    def test_filter_num_of_bedrooms(self):
        """Test filter returns two hotels where num_of_bedrooms = 2"""
        url = reverse('apartment_filter')
        data: dict = {'num_of_bedrooms': 2}
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(content), 2)
        self.assertTrue(content['num_of_bedrooms'], 2)

    def test_filter_location(self):
        """Test filter returns one hotel where latitude = 10, longitude = 20"""
        url = reverse('apartment_filter')
        data: dict = {'lat': 10, 'lon': 20}
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(content), 1)
        self.assertTrue(content['lat'], 10)
        self.assertTrue(content['lon'], 20)

    def test_filter_date(self):
        """Test filter return one hotel where created_at = 2022-01-31"""
        url = reverse('apartment_filter')
        hotel = Apartment.objects.get(title='Test Hotel 1')  # Get an object from db
        data = {'created_at': hotel.created_at}  # Get object's creation time
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(content), 1)
        self.assertTrue(content['created_at'], hotel.created_at)  # Compare result's creation time with object's
