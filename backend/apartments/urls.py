from django.urls import path

from apartments.api.views import (BookingView, ReviewsView, BookingHistoryView, PriceAnalyticView, FavoriteApartmentView,
                                  CancelBookView)

urlpatterns = [
    path('<int:pk>/book', BookingView.as_view(), name='booking'),
    path('<int:pk>/cancel-book/', CancelBookView.as_view(), name='cancel_book'),
    path('<int:pk>/reviews', ReviewsView.as_view(), name='reviews'),
    path('special/book-history/', BookingHistoryView.as_view(), name="book_history"),
    path('special/price-analytic/', PriceAnalyticView.as_view({"post": "create"}), name="price_analytic"),
    path('favorite/list', FavoriteApartmentView.as_view({'get': 'list'}), name='favorite_apartment'),
    path('favorite/<int:pk>/save', FavoriteApartmentView.as_view({'post': 'create'}), name='favorite_apartment_add'),
    path('favorite/<int:pk>/delete', FavoriteApartmentView.as_view({'delete': 'destroy'}),
         name='favorite_apartment_delete')
]
