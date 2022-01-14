from django.urls import path

from apartments.api.views import BookingView, ReviewsView

urlpatterns = [
    path('<int:pk>/book', BookingView.as_view(), name='booking'),
    path('<int:pk>/reviews', ReviewsView.as_view(), name='reviews'),
]
