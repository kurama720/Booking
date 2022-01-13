from django.urls import path

from accounts.api.views import RegisterView, CustomTokenObtainView
from accounts.api.views import LogoutView
from accounts.api.views import BusinessClientRegisterView
from accounts.api.views import BusinessClientSignInView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='sign_up'),
    path('signin/', CustomTokenObtainView.as_view(), name='sign_in'),
    path('logout/', LogoutView.as_view(), name='log_out'),
    path('business/signup/', BusinessClientRegisterView.as_view(), name='business_sign_up'),
    path('business/signin/', BusinessClientSignInView.as_view(), name='business_sign_in'),
    path('business/logout/', LogoutView.as_view(), name='business_log_out'),
]
