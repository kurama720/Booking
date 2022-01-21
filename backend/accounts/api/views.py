from drf_spectacular.utils import extend_schema
from rest_framework import generics, status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenViewBase
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

from accounts.models import ClientUser, BusinessClientUser
from accounts.api.tokens import CustomAccessToken
from accounts.api.serializers import (BusinessClientSerializer, BusinessClientRegisterSerializer,
                                      BusinessClientSignInSerializer, RegisterSerializer,
                                      CustomTokenObtainSerializer, CustomTokenDestroySerializer,
                                      ResetPasswordEmailRequestSerializer)
from accounts.utils import Util


class RegisterView(generics.CreateAPIView):
    queryset = ClientUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class CustomTokenObtainView(TokenViewBase):
    """Create a view class that returns only the access token in the response"""

    serializer_class = CustomTokenObtainSerializer


class LogoutView(APIView):
    """View to manage logout post-request"""
    permission_classes = (IsAuthenticated,)

    @extend_schema(
        request=CustomTokenDestroySerializer,
        responses={200: CustomTokenDestroySerializer}
    )
    def post(self, request, format=None):
        serializer = CustomTokenDestroySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            text = serializer.validated_data.get("text")
            if text == "logout":
                access_token = request.headers.get("Authorization").removeprefix("Bearer ").strip()
                custom_access_token = CustomAccessToken(access_token)
                custom_access_token.blacklist()
                return Response(data={"logout": "access"})
            return Response(data="Invalid field value!",
                            status=status.HTTP_400_BAD_REQUEST)


class BusinessClientViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = BusinessClientUser.objects.all()
    serializer_class = BusinessClientSerializer
    http_method_names = ['get', 'head', 'options', 'trace']


class BusinessClientRegisterView(generics.CreateAPIView):
    queryset = BusinessClientUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = BusinessClientRegisterSerializer


class BusinessClientSignInView(TokenViewBase):
    serializer_class = BusinessClientSignInSerializer


class RequestPasswordResetView(generics.GenericAPIView):
    """View for send a message to email a registered user"""
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        email = request.data.get('email')
        if ClientUser.objects.filter(email=email).exists():
            user = ClientUser.objects.get(email=email)
            uid64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = f"password-reset/{uid64}/{token}"
            absurl = f"http://{current_site}{relative_link}"
            email_body = f"Hello {user.email}. Use link below to reset your password \n' {absurl}"
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Resset your password'}
            Util.send_mail(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
