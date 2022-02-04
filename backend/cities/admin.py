import pandas as pd
from django.contrib.gis.geos import Point
from pandas.errors import EmptyDataError

from django.contrib import admin, messages
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from cities.models import City
from apartments.admin import ApartmentAdmin
from apartments.forms import CsvImportForm


@admin.register(City)
class CityAdmin(ApartmentAdmin):
    """Class that provide admin interface for uploading cities to the db"""
    search_fields = ordering = list_filter = ("name", )
    list_display = ("name", "lat", "lon")

    def upload_csv(self, request):
        """Uploading data from a csv file into the db"""
        if request.method == "POST":
            render(request, "admin/csv_upload.html")

            if csv_file := request.FILES.get("csv_upload"):
                if not csv_file.name.endswith('.csv'):
                    self.message_user(request,
                                      "You try to upload wrong file type",
                                      level=messages.WARNING)
                    return HttpResponseRedirect(request.path_info)
                try:
                    file_data = pd.read_csv(csv_file, sep=",")
                except EmptyDataError:
                    self.message_user(
                        request,
                        "You try to upload empty file!",
                        level=messages.WARNING
                    )
                    return HttpResponseRedirect(request.path_info)
                row_iter = file_data.iterrows()
                try:
                    cities = [
                        City(name=row["name"],
                             location=Point(float(row["lon"]),
                                            float(row["lat"])))
                        for _, row in row_iter
                    ]

                    if not cities:
                        raise KeyError
                    City.objects.bulk_create(cities)
                    self.message_user(request,
                                      "Csv file has been imported")
                    url = reverse("admin:index")
                    return HttpResponseRedirect(url)
                except ValueError:
                    self.message_user(request,
                                      "Csv file data format doesn't fit",
                                      level=messages.WARNING)
                except IntegrityError:
                    self.message_user(request,
                                      "You try to upload duplicates data in db!",
                                      level=messages.WARNING)
                except KeyError:
                    self.message_user(request,
                                      "Csv file has no field name header",
                                      level=messages.WARNING)
        form = CsvImportForm()
        return render(request,
                      "admin/csv_upload.html",
                      context={"form": form})
