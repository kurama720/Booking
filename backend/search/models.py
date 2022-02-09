from django.contrib.gis.db import models
from django.contrib.gis.geos import Point, fromstr
from django.contrib.gis.measure import Distance
from django.db.models import QuerySet

from apartments.models import Apartment


class ApartmentGeoWrapper(models.Model):
    hotel = models.OneToOneField(Apartment, on_delete=models.CASCADE)
    location = models.PointField(geography=True,
                                 blank=True,
                                 null=True)

    class Meta:
        indexes = [models.Index(fields=("location", ))]

    def save(self, *args, **kwargs):
        self.location = Point(self.hotel.lon, self.hotel.lat)
        super().save(*args, **kwargs)

    @classmethod
    def get_objects_inside_circle(cls, *,
                                  lat: float,
                                  lon: float,
                                  radius: int) -> QuerySet:
        """
        Method finds all objects inside circle with center in (lon, lat)
         and specified radius
        :param lat: center latitude
        :param lon: center longitude
        :param radius: circle radius
        :return: objects queryset
        """
        circle_center = fromstr("POINT({} {})".format(lon, lat))
        return cls.objects.filter(
                    location__distance_lte=(circle_center,
                                            Distance(m=radius))
                )

    def __str__(self):
        return self.hotel.title
