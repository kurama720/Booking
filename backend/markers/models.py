from django.contrib.gis.db import models as gis_models
from django.contrib.gis.geos import Point

from apartments.models import Apartment


class Marker(gis_models.Model):
    hotel = gis_models.OneToOneField(Apartment, on_delete=gis_models.CASCADE, null=True, blank=True)
    location = gis_models.PointField(blank=True, null=True)
    title = gis_models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        """Assign title and location of the apartment"""
        self.title = self.hotel.title
        self.location = Point(self.hotel.lon, self.hotel.lat)
        super().save(*args, **kwargs)

    @property
    def longitude(self):
        return self.location.x

    @property
    def latitude(self):
        return self.location.y

    def __str__(self):
        return self.title
