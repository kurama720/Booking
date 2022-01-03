from django.urls import path
from apartments.views import BookingView

urlpatterns = [
    path('<str:pk>/book', BookingView.as_view())
]