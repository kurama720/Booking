from django.urls import path

from accounts.api.views import RegisterView, CustomTokenObtainView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='sign_up'),
    path('signin/', CustomTokenObtainView.as_view(), name='sign_in'),
]
