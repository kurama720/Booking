from django.urls import path
from search.api.views import ApartmentSearchView

urlpatterns = [
    path("", ApartmentSearchView.as_view(), name="base_search_page")
]
