from django.urls import path

from accounts.api.views import RegisterView


urlpatterns = [
    path('signup/', RegisterView.as_view(), name='sign_up'),
]
