from django.urls import path

from apartments.api.views import BookingView

urlpatterns = [
    path('<int:pk>/book', BookingView.as_view())
]
