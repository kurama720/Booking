from django.urls import path

from apartments.api.views import ApartmentListView
from apartments.views import BookingView

urlpatterns = [
    path('<int:pk>/book', BookingView.as_view()),
    path('', ApartmentListView.as_view({'get': 'list'}), name='apartment_filter'),
]
