from django.contrib.gis.db import models


class City(models.Model):
    """
    Model that provides cities essence representation
    """
    name = models.CharField(max_length=255, unique=True)
    location = models.PointField(geography=True, unique=True)

    class Meta:
        verbose_name_plural = 'Cities'
        indexes = [models.Index(fields=("name", ))]

    @property
    def lat(self):
        return self.location.y

    @property
    def lon(self):
        return self.location.x

    @classmethod
    def get_city_by_name_part(cls, name_part: str) -> models.QuerySet:
        """
        Function to find cities with names, that contain 'name_part' string
        :param name_part: part of the city name
        :return: Queryset with currents cities
        """
        queryset = cls.objects.filter(name__istartswith=name_part)
        return queryset

    def __str__(self):
        return self.name
