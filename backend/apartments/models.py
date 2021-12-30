import uuid
from django.db import models


class Apartment(models.Model):
    """Model for defining apartments"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid1, editable=False)  # unique key
    title = models.TextField()  # apartment name
    price = models.PositiveIntegerField(db_index=True)  # price per day
    img = models.ImageField(upload_to='apartments/')  # apartment avatar
    lat = models.FloatField()  # latitude
    lon = models.FloatField()  # longitude
    description = models.TextField()  # apartment description
    num_of_bedrooms = models.PositiveIntegerField(default=2)  # number of bedrooms
    rating = models.PositiveIntegerField(blank=True, null=True)  # number-star apartment
    created_at = models.DateTimeField(auto_now_add=True)  # date of addition of apartments

    class Meta:
        ordering = ('-rating',)

    def __str__(self):
        return self.title
