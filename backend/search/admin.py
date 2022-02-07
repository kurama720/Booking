from django.contrib import admin, messages
from django.core.exceptions import PermissionDenied
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import path, reverse

from search.models import ApartmentGeoWrapper
from apartments.models import Apartment


@admin.register(ApartmentGeoWrapper)
class ApartmentGeoWrapperAdmin(admin.ModelAdmin):
    def get_urls(self):
        urls = super().get_urls()
        new_urls = [path('wrap-apartments-objects/', self.wrap_apartments_objects), ]
        return new_urls + urls

    def wrap_apartments_objects(self, request):
        if not request.user.is_superuser:
            raise PermissionDenied
        if request.method == "GET":
            apartments_queryset = Apartment.objects.all()
            render(request, "admin/base.html")
            try:
                assert apartments_queryset
                [ApartmentGeoWrapper(hotel=apartment).save()
                 for apartment in apartments_queryset]
                self.message_user(request,
                                  "All apartments wrappers was created successful")
            except IntegrityError:
                self.message_user(request,
                                  "You try to upload duplicates data in db!",
                                  level=messages.ERROR)
            except AssertionError:
                self.message_user(request,
                                  "No currents hotels in db!",
                                  level=messages.ERROR)

            url = reverse("admin:index")
            return HttpResponseRedirect(url)
