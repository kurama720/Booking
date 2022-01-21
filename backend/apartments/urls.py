from django.urls import path

from apartments.api.views import BookingView, ReviewsView, BookingHistoryView, PriceAnalyticView

urlpatterns = [
    path('<int:pk>/book', BookingView.as_view(), name='booking'),
    path('<int:pk>/reviews', ReviewsView.as_view(), name='reviews'),
    path('special/book-history/', BookingHistoryView.as_view(), name="book_history"),
    path('special/price-analytic/', PriceAnalyticView.as_view({"post": "create"}), name="price_analytic")
]
