import json
import uuid

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apartments.models import Apartment, Booking
from accounts.models import ClientUser, BusinessClientUser


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
                                 description='The second test hotel', rating=4, feature={'guests': 1,
                                                                                         'bedrooms': 1,
                                                                                         'beds': 1,
                                                                                         'bathrooms': 1})
        Apartment.objects.create(title='Test Hotel 3', price=50, lat=40, lon=50,
                                 description='The third test hotel', rating=2, feature={'guests': 2,
                                                                                        'bedrooms': 2,
                                                                                        'beds': 3,
                                                                                        'bathrooms': 1, })

        Booking.objects.create(check_in_date='2022-01-10', check_out_date='2022-01-15', num_of_persons=2,
                               comment='Test', idempotency_key=uuid.uuid4(),
                               client=ClientUser.objects.create(email='client@client.com', first_name='Test',
                                                                last_name='Client', password='Test1234'),
                               apartment=Apartment.objects.get(title='Test Hotel 1'),
                               business_client=BusinessClientUser.objects.create(password='Test1234',
                                                                                 email='bisnes@bisnes.com',
                                                                                 first_name='Test', last_name='Test',
                                                                                 organization_name='Test'))

    def test_filter_feature(self):
        """Test filter returns two hotels where guests = 2"""
        response = self.client.get('http://localhost:8000/apartments/?feature=guests:2,beds:3', format='json')
        content: dict = json.loads(response.content)
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(content), 2)
        self.assertEqual(content[0]['feature']['guests'], 2)

    def test_filter_location(self):
        """Test filter returns one hotel where latitude = 10, longitude = 20"""
        url = reverse('apartment-list')
        data: dict = {'lat': 10, 'lon': 20}
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(content), 1)
        self.assertEqual(content[0]['lat'], 10)
        self.assertEqual(content[0]['lon'], 20)

    def test_filter_check_availability(self):
        """Test filter return two hotels available for booking"""
        url = reverse('apartment-list')
        data: dict = {'check_availability': '2022-01-09,2022-01-15'}
        response = self.client.get(url, data, format='json')
        content: dict = json.loads(response.content)
        self.assertTrue(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(content), 2)

    def test_price_filter(self):
        """Test apartment price filter"""
        url = reverse('apartment-list')
        response = self.client.get(url, data={'min_price': 50, 'max_price': 80})
        self.assertEqual(len(response.json()), 2)

        response = self.client.get(url, data={'min_price': 90, 'max_price': 150})
        self.assertEqual(len(response.json()), 1)

        response = self.client.get(url, data={'min_price': 70, 'max_price': 90})
        self.assertEqual(len(response.json()), 1)
