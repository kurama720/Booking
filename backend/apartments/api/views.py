from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView, get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema

from apartments.services import ApartmentFilter
from apartments.models import Booking, Apartment
from apartments.api.permissions import IsOwnerOrReadOnly
from apartments.api.serializers import ApartmentSerializer, BookingSerializer


class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = (IsOwnerOrReadOnly, )
    http_method_names = ('get', 'post', 'put', 'head', 'options', 'trace')
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('lat', 'lon', 'created_at', 'num_of_bedrooms',)
    filter_class = ApartmentFilter

    def create(self, request, *args, **kwargs):
        if business_acc_id := request.data.get("business_account"):
            if business_acc_id != str(request.user.id):
                raise ValidationError("Invalid 'business_account' field value. " +
                                      "Choose correct account or skip this value")
        serializer = ApartmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        business_client_user = request.user.clientuser.businessclientuser
        serializer.validated_data.update(business_account=business_client_user)
        intermediate_ser_data = serializer.validated_data.copy()
        intermediate_ser_data.pop("img")
        is_obj_exists = Apartment.objects.filter(**intermediate_ser_data).exists()
        if is_obj_exists:
            raise ValidationError("This object already exists!")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class BookingView(GenericAPIView):
    """View to manage booking apartments requests"""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @extend_schema(
        request=BookingSerializer,
        responses={201: BookingSerializer}
    )
    def post(self, request, pk: int):
        """
        Process POST requests

        :param pk: apartment unique id from request path
        """
        apartment = get_object_or_404(Apartment.objects.all(), pk=pk)
        serializer = BookingSerializer(data=request.data)
        client = request.user
        serializer.is_valid(raise_exception=True)
        check_in_date = serializer.validated_data.get("check_in_date")
        check_out_date = serializer.validated_data.get("check_out_date")
        num_of_persons = serializer.validated_data.get("num_of_persons")
        comment = serializer.validated_data.get("comment")
        idempotency_key = serializer.validated_data.get("idempotency_key")
        if apartment.book_apartment(check_in_date, check_out_date,
                                    num_of_persons, comment, idempotency_key, client):
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data="Apartment is not available for booking",
                            status=status.HTTP_403_FORBIDDEN)
