from drf_spectacular.utils import extend_schema, OpenApiExample
from rest_framework import generics, status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenViewBase

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
                                      BusinessClientUserSerializer)


class RegisterView(generics.CreateAPIView):
    queryset = ClientUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


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
