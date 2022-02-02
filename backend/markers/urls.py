from django.urls import path

from markers.api.views import MarkerView

urlpatterns = [
    path('markers/', MarkerView.as_view(), name='markers'),
]
