from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from drf_spectacular.utils import extend_schema, extend_schema_serializer, OpenApiExample
from django.db import IntegrityError

from apartments.models import (Booking,
                               Apartment,
                               available_to_book,
                               check_booking_client,
                               )
from apartments.serializers import BookingSerializer
from accounts.models import ClientUser


class BookingView(GenericAPIView):
    """View to manage booking apartments requests"""
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @extend_schema(
        request=BookingSerializer,
        responses={201: BookingSerializer}
    )
    def post(self, request, pk: str):
        """
        Process POST requests

        :param pk: apartment unique id from request path
        """
        user_check_in_date = request.data.get("check_in_date")
        user_check_out_date = request.data.get("check_out_date")
        client_id = request.data.get("client")
        try:
            booked_apart = available_to_book(pk, user_check_in_date,
                                             user_check_out_date)
            apartment = Apartment.objects.get(pk=pk)
            client = ClientUser.objects.get(pk=client_id)
            if not booked_apart:
                serializer = BookingSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(apartment=apartment, client=client)
                    return Response(data=serializer.data,
                                    status=status.HTTP_201_CREATED)
            else:
                owner = check_booking_client(pk, user_check_in_date,
                                             user_check_out_date, client_id)
                if owner:
                    return Response(data="You have previously booked this apartment",
                                    status=status.HTTP_200_OK)
                return Response(data="Apartment booked",
                                status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
