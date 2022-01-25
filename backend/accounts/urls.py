from django.urls import path

from accounts.api.views import (RegisterView,
                                CustomTokenObtainView,
                                LogoutView,
                                BusinessClientRegisterView,
                                BusinessClientSignInView,
                                UserInfoView)

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='sign_up'),
    path('signin/', CustomTokenObtainView.as_view(), name='sign_in'),
    path('logout/', LogoutView.as_view(), name='log_out'),
    path('business/signup/', BusinessClientRegisterView.as_view(), name='business_sign_up'),
    path('business/signin/', BusinessClientSignInView.as_view(), name='business_sign_in'),
    path('business/logout/', LogoutView.as_view(), name='business_log_out'),
    path('info/', UserInfoView.as_view(), name='info')
]
