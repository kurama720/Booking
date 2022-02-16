import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from apartments.models import Apartment
from accounts.models import ClientUser


class FavoriteApartmentsTestCase(APITestCase):

    def setUp(self):
        """Set up necessary data in test db"""
        self.user = ClientUser.objects.create_user(email="client@client.com", password="Test1234")
        Apartment.objects.create(title='Test Hotel 1', price=100, lat=10, lon=20,
                                 description='The first test hotel', rating=5, feature=None)
        Apartment.objects.create(title='Test Hotel 2', price=80, lat=30, lon=40,
                                 description='The second test hotel', rating=4, feature=None)

    def test_favorites_created_returned_and_deleted(self):
        """
        Post first apartment providing its id for the user.
        Get it on another endpoint of the same user.
        Delete apartment and check favorite list is empty.
        """
        token = str(AccessToken().for_user(self.user))  # Token for imitating authentication
        ap_id = Apartment.objects.get(title='Test Hotel 1').id
        url = reverse("favorite_apartment_add", args=[ap_id])
        response = self.client.post(url, HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse('favorite_apartment')
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f"Bearer {token}")
        content: dict = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(content), 1)

        url = reverse('favorite_apartment_delete', args=[ap_id])
        response = self.client.delete(url, format='json', HTTP_AUTHORIZATION=f"Bearer {token}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.content), 0)
