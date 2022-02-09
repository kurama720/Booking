from django.urls import path, include

from accounts.api.views import (RegisterView,
                                CustomTokenObtainView,
                                LogoutView,
                                BusinessClientRegisterView,
                                BusinessClientSignInView,
                                UserInfoView,
                                VerifyEmailView,
                                RequestPasswordResetView,
                                UserDetailViewSet,
                                )
from apartments.api.views import ClientBookingHistoryView


urlpatterns = [
    path('social/', include('social_django.urls', namespace='social')),
    path('signup/', RegisterView.as_view(), name='sign_up'),
    path('signin/', CustomTokenObtainView.as_view(), name='sign_in'),
    path('logout/', LogoutView.as_view(), name='log_out'),
    path('business/signup/', BusinessClientRegisterView.as_view(), name='business_sign_up'),
    path('business/signin/', BusinessClientSignInView.as_view(), name='business_sign_in'),
    path('business/logout/', LogoutView.as_view(), name='business_log_out'),
    path('password-reset-email/', RequestPasswordResetView.as_view(), name='password_reset_email'),
    path('info/', UserInfoView.as_view(), name='info'),
    path('booking-history/', ClientBookingHistoryView.as_view(), name='client_booking_history'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
    path('me/', UserDetailViewSet.as_view({'get': 'list', 'post': 'update'}), name='client_info'),
]
