import json

from django.urls import reverse
from rest_framework.test import APITestCase

from markers.models import Marker
from apartments.models import Apartment

# Zoom center should be near the Test Hotel 2 for tests
params: dict[str, float] = {'center_lon': 27.57847108, 'center_lat': 53.91185994}


class MarkerApiTestCase(APITestCase):
    def setUp(self):
        """Create two apartments so that the distance between them is more than 100 meters"""
        Apartment.objects.create(title='Test Hotel 1', price=100, img=None, lat=53.911766, lon=27.587968,
                                 description='The first test hotel', num_of_bedrooms=2, rating=5,)
        Apartment.objects.create(title='Test Hotel 2', price=100, img=None, lat=53.91185994, lon=27.57847108,
                                 description='The first test hotel', num_of_bedrooms=2, rating=5,)
        Marker.objects.create(hotel=1)
        Marker.objects.create(hotel=2)

    def test_api_returns_one(self):
        """Change radius to 100 meters so that only one hotels is included in the zoom circle"""
        url = reverse('markers')
        params['radius'] = 100
        response = self.client.get(url, params, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(len(content), 1)
        self.assertTrue(content['title'], 'Test Hotel 2')

    def test_api_returns_two(self):
        """Change radius to 1000 meters so that two hotels are included in the zoom circle"""
        url = reverse('markers')
        params['radius'] = 1000
        response = self.client.get(url, params, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(len(content), 2)

    def test_api_returns_empty(self):
        """Change zoom center so that none of the markers are included in the zoom circle"""
        url = reverse('markers')
        params['center_lat'] = 10.91185994
        response = self.client.get(url, params, format='json')
        content: dict = json.loads(response.content)[0]
        self.assertTrue(len(content), 0)
