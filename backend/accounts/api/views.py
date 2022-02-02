from drf_spectacular.utils import extend_schema
from rest_framework import generics, status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenViewBase
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from rest_framework.generics import get_object_or_404


from accounts.models import ClientUser
from accounts.models import BusinessClientUser
from accounts.api.tokens import CustomAccessToken
from accounts.api.serializers import (RegisterSerializer,
                                      CustomTokenObtainSerializer,
                                      CustomTokenDestroySerializer,
                                      BusinessClientSerializer,
                                      BusinessClientRegisterSerializer,
                                      BusinessClientSignInSerializer,
                                      ClientUserSerializer,
                                      BusinessClientUserSerializer,
                                      EmailVerificationSerializer,
                                      )
from accounts.utils import create_verify_mail_data
from accounts.api.tokens import account_activation_token
from accounts.tasks import send_mail


class RegisterView(generics.GenericAPIView):
    """View to manage sign up post-request"""
    queryset = ClientUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    @extend_schema(
        responses={200: "string"}
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        current_site = get_current_site(request).domain
        mail_data = create_verify_mail_data(user_data, current_site)
        send_mail.delay(mail_data)
        return Response({'email': 'Please confirm your email address to complete the registration'},
                        status=status.HTTP_200_OK)


class VerifyEmailView(generics.GenericAPIView):
    """View to manage verify email requests"""
    queryset = ClientUser.objects.all()
    serializer_class = EmailVerificationSerializer

    @extend_schema(
        responses={200: "string", 404: "string"}
    )
    def get(self, request):
        try:
            token = request.GET.get('token')
            uidb64 = request.GET.get('uidb64')
            user_id = force_text(urlsafe_base64_decode(uidb64))
            user = self.queryset.get(pk=user_id)
            if account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return Response({'email': 'Successfully activated'},
                                status=status.HTTP_200_OK)
            if user.is_active:
                return Response({'email': 'Already activate'},
                                status=status.HTTP_200_OK)
            return Response({'error': 'Invalid Token or Activation Expired. Try to verify your email again'},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        responses={200: "string"}
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.data
        user = get_object_or_404(ClientUser.objects.all(), email=user_data['email'])
        if user.is_active:
            return Response({'email': 'Already activate'}, status=status.HTTP_200_OK)
        current_site = get_current_site(request).domain
        mail_data = create_verify_mail_data(user_data, current_site, user)
        send_mail(mail_data)
        return Response({'email': 'Please confirm your email address to complete the registration'},
                        status=status.HTTP_200_OK)


class CustomTokenObtainView(TokenViewBase):
    """Create a view class that returns only the access token in the response"""

    serializer_class = CustomTokenObtainSerializer


class LogoutView(APIView):
    """View to manage logout post-request"""
    permission_classes = (IsAuthenticated, )

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
    permission_classes = (AllowAny, )
    serializer_class = BusinessClientRegisterSerializer


class BusinessClientSignInView(TokenViewBase):
    serializer_class = BusinessClientSignInSerializer


class UserInfoView(APIView):
    """
    View class to representation some clients info
    """
    permission_classes = (IsAuthenticated, )

    @extend_schema(
        responses={200: ClientUserSerializer}
    )
    def get(self, request):
        try:
            request.user.clientuser.businessclientuser
        except (ClientUser.businessclientuser.RelatedObjectDoesNotExist,
                AttributeError):
            serializer = ClientUserSerializer(
                instance=request.user.clientuser)
            return Response(data=serializer.data)
        serializer = BusinessClientUserSerializer(
            instance=request.user.clientuser.businessclientuser)
        return Response(data=serializer.data)
