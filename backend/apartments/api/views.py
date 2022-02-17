from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.generics import GenericAPIView, get_object_or_404, ListAPIView
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema

from apartments.services import ApartmentFilter, BookingHistoryFilter
from apartments.models import Booking, Apartment, ApartmentReview, ApartmentsImage
from apartments.api.permissions import IsOwnerOrReadOnly, IsBusinessClient, IsClientOnly
from apartments.api.serializers import (ApartmentSerializer, BookingSerializer,
                                        ReviewsSerializer, PriceAnalyticSerializer, FavoriteApartmentSerializer)
from apartments.business_logic import check_files_in_request
from accounts.models import ClientUser
from apartments.utils import create_mail_for_confirm_booking
from accounts.tasks import send_mail


class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = (IsOwnerOrReadOnly, )
    http_method_names = ('get', 'post', 'put', 'delete', 'head', 'options', 'trace')
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('lat', 'lon', 'feature', 'min_price', 'max_price')
    filter_class = ApartmentFilter
    parser_classes = (MultiPartParser, FormParser)

    def retrieve(self, request,  *args, **kwargs):
        """Process GET requests /apartments/{id}"""
        apartment = self.get_object()
        apartment_data = self.add_apartment_reviews_information(apartment)
        return Response(data=apartment_data)

    def list(self, request, *args, **kwargs):
        apartments = self.filter_queryset(self.get_queryset())
        self.check_is_favorite(request, apartments)
        apartments_data = [self.add_apartment_reviews_information(apartment) for
                           apartment in apartments]
        return Response(data=apartments_data)

    def add_apartment_reviews_information(self, apartment):
        apartment_data = self.get_serializer(apartment).data
        reviews_information = apartment.get_apartment_reviews_information()
        apartment_data.update(reviews_information)
        return apartment_data

    def check_is_favorite(self, request, queryset):
        client = ClientUser.objects.get(id=request.user.id)
        for apartment in queryset:
            if client in apartment.user.all():
                apartment.is_favorite = True
            else:
                apartment.is_favorite = False
            apartment.save(update_fields=['is_favorite'])
        return queryset

    def create(self, request, *args, **kwargs):
        if business_acc_id := request.data.get("business_account"):
            if business_acc_id != str(request.user.id):
                raise ValidationError("Invalid 'business_account' field value. " +
                                      "Choose correct account or skip this value")
        if images := check_files_in_request(request):
            request.data.pop("img_content")
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            business_client_user = request.user.clientuser.businessclientuser
            serializer.validated_data.update(business_account=business_client_user)
            intermediate_ser_data = serializer.validated_data.copy()
            is_obj_exists = Apartment.objects.filter(**intermediate_ser_data).exists()
            if is_obj_exists:
                raise ValidationError("This object already exists!")
            serializer.save()

            serializer.instance.add_images_to_apartments(images)
            response_data = serializer.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(data={"img_content": ["This field is required."]},
                        status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        if images := check_files_in_request(request):
            response_data = super().update(request,
                                           *args,
                                           **kwargs).data
            instance = self.get_object()
            instance.add_images_to_apartments(images)
            to_update_data = self.get_serializer(instance).data
            response_data.update(to_update_data)
            return Response(data=response_data)
        return Response(data={"img_content": ["This field is required."]},
                        status=status.HTTP_400_BAD_REQUEST)


class BookingView(GenericAPIView):
    """View to manage booking apartments requests"""
    permission_classes = (IsClientOnly,)
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
            mail_data = create_mail_for_confirm_booking(check_in_date, check_out_date,
                                                        apartment, client, num_of_persons, action='confirmation')
            send_mail(mail_data)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data="Apartment is not available for booking",
                            status=status.HTTP_403_FORBIDDEN)


class BookingHistoryView(ListAPIView):
    """View to provide book history"""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = (IsBusinessClient,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('check_in_date',)
    filter_class = BookingHistoryFilter

    def filter_queryset(self, queryset):
        old_queryset = super().filter_queryset(queryset)
        queryset = old_queryset.filter(
            business_client=self.request.user.clientuser.businessclientuser
        )
        return queryset


class ReviewsView(GenericAPIView):
    """View to manage apartments reviews requests"""
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = ApartmentReview.objects.all()
    serializer_class = ReviewsSerializer

    def get(self, request, pk: int):
        """
        Process GET requests

        :param pk: apartment unique id from request path
        """
        apartment = get_object_or_404(Apartment.objects.all(), pk=pk)
        apartment_reviews = apartment.get_apartment_reviews()
        return Response(data=apartment_reviews)

    def post(self, request, pk: int):
        """
        Process POST requests

        :param pk: apartment unique id from request path
        """
        apartment = get_object_or_404(Apartment.objects.all(), pk=pk)
        serializer = ReviewsSerializer(data=request.data)
        client = request.user
        serializer.is_valid(raise_exception=True)
        comment = serializer.validated_data.get("comment")
        rate = serializer.validated_data.get("rate")
        apartment.apartment_review(comment, rate, client)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class PriceAnalyticView(CreateModelMixin, GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PriceAnalyticSerializer

    def perform_create(self, serializer):
        flat = serializer.validated_data.get("flat")
        prices = Apartment.get_prices_count_by_location(flat)
        serializer.validated_data.update(prices)


class ClientBookingHistoryView(GenericAPIView):
    """View to provide client booking history"""
    permission_classes = (IsClientOnly,)
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get(self, request):
        """Process GET requests"""
        queryset = Booking.objects.filter(client=request.user)
        data = self.get_serializer(queryset, many=True).data
        return Response(data=data)


class FavoriteApartmentView(viewsets.ViewSet):
    """View to return favorite apartments of the user"""
    permission_classes = (IsClientOnly,)

    def list(self, request):
        """
        Return apartments with related name.
        """
        queryset = ClientUser.objects.get(id=request.user.id).favorite_apartments
        serializer = FavoriteApartmentSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, pk):
        """
        Save request user id in m2m field user of the apartment with given id
        :param pk: apartment unique id from request path
        """
        try:
            apartment = Apartment.objects.get(id=pk)
            apartment.user.add(request.user.id)
            apartment.save()
            return Response(status=status.HTTP_201_CREATED)
        except Apartment.DoesNotExist:
            return Response(data="No apartment with such id", status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            apartment = Apartment.objects.get(id=pk)
            apartment.user.remove(request.user.id)
            apartment.save()
            return Response(status=status.HTTP_200_OK)
        except Apartment.DoesNotExist:
            return Response(data="No apartment with such id", status=status.HTTP_404_NOT_FOUND)


class CancelBookView(GenericAPIView):
    permission_classes = (IsClientOnly,)
    queryset = Booking.objects.all()

    def delete(self, request, pk: int):
        book_apartment = get_object_or_404(self.queryset, pk=pk)
        book_apartment.cancel_book()
        return Response(status=status.HTTP_200_OK)
