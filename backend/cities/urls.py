from django.urls import path

from cities.api.views import CityView

urlpatterns = [
    path('coordinates', CityView.as_view(), name='coordinates')
]
