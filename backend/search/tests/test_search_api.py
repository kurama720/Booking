import uuid

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from apartments.models import Apartment
from search.models import ApartmentGeoWrapper
from accounts.models import User


class ApartmentSearchViewApiTestCase(APITestCase):
    def setUp(self):
        hotels = [Apartment(
            uuid=uuid.uuid4(),
            title=f"title{N}",
            price=N,
            lat=N,
            lon=N,
            description="description"
        ) for N in range(1, 11)]
        Apartment.objects.bulk_create(hotels)

        for apartment in hotels:
            ApartmentGeoWrapper(hotel=apartment).save()

        user = User.objects.create(email="email@user.vom",
                                   password="1234567890op")

        self.token = str(AccessToken().for_user(user))
        self.url = reverse("base_search_page")

    def test_search_request(self):
        request_params = dict(path=self.url,
                              HTTP_AUTHORIZATION=f"Bearer {self.token}",
                              data={"lat": 5,
                                    "lon": 5,
                                    "radius": 100000})

        response = self.client.get(**request_params)
        self.assertEqual(len(response.json()), 1)

        request_params["data"]["radius"] = 1000000

        response = self.client.get(**request_params)
        self.assertEqual(len(response.json()), 10)
