from django.urls import path

from apartments.views import BookingView

urlpatterns = [
    path('<int:pk>/book', BookingView.as_view()),
]
