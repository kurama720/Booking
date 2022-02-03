from random import randint

from django.contrib.gis.geos import Point
from django.test import TestCase

from cities.models import City


class CityMethodsLogicTestCase(TestCase):
    def setUp(self):
        cities = [City(name=f"Minsk{N}",
                       location=Point(N, N)) for N in range(1, 11)]
        City.objects.bulk_create(cities)

    def test_get_city_by_name_part_correct_behavior(self):
        city_name_part = "Mi"
        results = City.get_city_by_name_part(city_name_part)

        self.assertEqual(len(results), 10)
        self.assertTrue(results[randint(0, 9)].name.startswith(city_name_part))

    def test_get_city_by_name_part_wrong_behavior(self):
        city_name_part = "1"
        results = City.get_city_by_name_part(city_name_part)

        self.assertEqual(len(results), 0)
