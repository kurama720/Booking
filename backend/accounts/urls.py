from django.urls import path

from accounts.api.views import RegisterView, CustomTokenObtainView

from accounts.api.views import LogoutView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='sign_up'),
    path('signin/', CustomTokenObtainView.as_view(), name='sign_in'),
    path('logout/', LogoutView.as_view(), name='log_out'),
]
