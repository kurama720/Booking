from rest_framework import generics
from django.contrib.gis.geos import fromstr
from django.contrib.gis.measure import Distance
from django.contrib.gis.db.models.functions import Distance as DistanceFunc

from markers.models import Marker
from markers.api.serializers import MarkerSerializer


class MarkerView(generics.ListAPIView):
    serializer_class = MarkerSerializer

    def get_queryset(self):
        """Take 3 params from request: latitude and longitude of the center of the zoom, and radius from which markers
        are going to be taken. Aggregate the circle of the zoom and get all markers included to it"""
        if self.request.method == 'GET':
            lon = self.request.GET.get('center_lon', None)
            lat = self.request.GET.get('center_lat', None)
            radius = self.request.GET.get('radius', None)
            if lat is not None and lon is not None and radius is not None:
                zoom_center = fromstr("POINT({} {})".format(lon, lat))  # Aggregate circle size
                # Filter markers according to the circle
                queryset = Marker.objects.filter(
                    location__distance_lte=(zoom_center, Distance(m=radius))
                ).annotate(
                    distance=DistanceFunc('location', zoom_center)
                )
                return queryset
