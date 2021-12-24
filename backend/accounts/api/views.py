from rest_framework import generics
from rest_framework.permissions import AllowAny

from accounts.models import ClientUser
from accounts.api.serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    queryset = ClientUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
