import uuid

from django.test import TestCase

from apartments.models import Apartment
from search.models import ApartmentGeoWrapper
from accounts.models import User


class GeoWrapsCreationTestCase(TestCase):
    def setUp(self):
        self.hotels = [Apartment(
            uuid=uuid.uuid4(),
            title=f"title{N}",
            price=N,
            lat=N,
            lon=N,
            description="description"
        ) for N in range(1, 11)]
        Apartment.objects.bulk_create(self.hotels)

        self.admin = User(email="user@example.com",
                          password="superUser22",
                          is_superuser=True,
                          is_staff=True,
                          is_active=True)
        self.admin.save()

        self.client.force_login(self.admin)

        self.url = "http://localhost:8000/admin/search/apartmentgeowrapper/wrap-apartments-objects/"

    def test_success_objects_create(self):
        geo_objs = ApartmentGeoWrapper.objects.all()
        self.assertEqual(len(geo_objs), 0)

        response = self.client.get(self.url)

        hotels_count = Apartment.objects.all().count()
        geo_objs = ApartmentGeoWrapper.objects.all()
        self.assertEqual(len(geo_objs), hotels_count)

        self.assertEqual(
            str(next(iter(response.context.get("messages"))).message),
            "All apartments wrappers was created successful"
        )

    def test_wrong_objects_create(self):
        for apartment in self.hotels:
            ApartmentGeoWrapper(hotel=apartment).save()

        geo_objs = ApartmentGeoWrapper.objects.all()
        self.assertEqual(len(geo_objs), 10)

        response = self.client.get(self.url)

        self.assertEqual(
            str(next(iter(response.context.get("messages"))).message),
            "You try to upload duplicates data in db!"
        )
