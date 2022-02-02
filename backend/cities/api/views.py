from rest_framework.generics import ListAPIView

from cities.models import City
from cities.api.serializers import CitySerializer


class CityView(ListAPIView):
    """
    View for handling get request to cities API
    """
    serializer_class = CitySerializer

    def get_queryset(self):
        name_sub_string = self.request.GET.get("word")
        if name_sub_string:
            queryset = City.get_city_by_name_part(name_part=name_sub_string)
            return queryset
        return []
