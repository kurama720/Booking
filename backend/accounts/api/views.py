from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenViewBase

from accounts.models import ClientUser
from accounts.api.serializers import RegisterSerializer, CustomTokenObtainSerializer


class RegisterView(generics.CreateAPIView):
    queryset = ClientUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class CustomTokenObtainView(TokenViewBase):
    """Create a view class that returns only the access token in the response"""

    serializer_class = CustomTokenObtainSerializer
