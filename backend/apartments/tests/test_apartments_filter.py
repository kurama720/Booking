import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apartments.models import Apartment


class ApartmentsTest(APITestCase):
    """Integration tests for app apartments"""

    def setUp(self):
        """Create test hotels in test database"""
        Apartment.objects.create(title='Test Hotel 1', price=100, lat=10, lon=20,
                                 description='The first test hotel', rating=5, feature={'guests': 2,
                                                                                        'bedrooms': 2,
                                                                                        'beds': 3,
                                                                                        'bathrooms': 1, })
        Apartment.objects.create(title='Test Hotel 2', price=80, lat=30, lon=40,
                                 description='The second test hotel', rating=4, feature=None)
        Apartment.objects.create(title='Test Hotel 3', price=50, lat=40, lon=50,
                                 description='The third test hotel', rating=2, feature={'guests': 2,
                                                                                        'bedrooms': 2,
                                                                                        'beds': 3,
                                                                                        'bathrooms': 1, })

    def test_filter_feature(self):
        """Test filter returns two hotels where guests = 2"""
        url = reverse('apartment-list')
        data: dict = {'guests': 2}
        response = self.client.get(url, feature=data, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(content), 2)
        self.assertTrue(content['feature']['guests'], 2)

    def test_filter_location(self):
        """Test filter returns one hotel where latitude = 10, longitude = 20"""
        url = reverse('apartment-list')
        data: dict = {'lat': 10, 'lon': 20}
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(content), 1)
        self.assertTrue(content['lat'], 10)
        self.assertTrue(content['lon'], 20)

    def test_filter_date(self):
        """Test filter return one hotel where created_at = 2022-01-31"""
        url = reverse('apartment-list')
        hotel = Apartment.objects.get(title='Test Hotel 1')  # Get an object from db
        data = {'created_at': hotel.created_at}  # Get object's creation time
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(content), 1)
        self.assertTrue(content['created_at'], hotel.created_at)  # Compare result's creation time with object's

    def test_price_filter(self):
        """Test apartment price filter"""
        url = reverse('apartment-list')
        response = self.client.get(url, data={'min_price': 50, 'max_price': 80})
        self.assertEqual(len(response.json()), 2)

        response = self.client.get(url, data={'min_price': 90, 'max_price': 150})
        self.assertEqual(len(response.json()), 1)

        response = self.client.get(url, data={'min_price': 70, 'max_price': 90})
        self.assertEqual(len(response.json()), 1)
