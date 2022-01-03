import pandas as pd

from django.contrib import admin, messages
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.shortcuts import render

from apartments.models import Apartment, Booking
from apartments.forms import CsvImportForm


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    """A class for adding apartments to the admin panel"""
    list_display = ('title', 'price')
    ordering = ('price',)
    list_filter = ('num_of_bedrooms', 'rating')
    search_fields = ('title', 'description')

    def get_urls(self):
        """Adding a new url to load data from a csv file"""
        urls = super().get_urls()
        new_urls = [path('upload-csv/', self.upload_scv), ]
        return new_urls + urls

    def upload_scv(self, request):
        """Loading data from a csv file into a database"""
        if request.method == 'POST':
            csv_file = request.FILES['csv_upload']  # Opening a file from a request

            if not csv_file.name.endswith('.csv'):
                messages.warning(request, 'The wrong file type was uploaded')
                return HttpResponseRedirect(request.path_info)

            file_data = pd.read_csv(csv_file, sep=';', header=None)
            row_iter = file_data.iterrows()

            apartments: list[Apartment] = [
                Apartment(id=row[0],
                          title=row[1],
                          price=row[2],
                          img=row[3],
                          lat=row[4].split(',')[0],
                          lon=row[4].split(',')[1],
                          description=row[5])
                for _, row in row_iter
            ]
            try:
                Apartment.objects.bulk_create(apartments)  # Adding data to the database
                self.message_user(request, "Your csv file has been imported")

            except IntegrityError:
                self.message_user(request, f"Add an existing apartment. Modify the csv file")

            url = reverse('admin:index')
            return HttpResponseRedirect(url)

        form = CsvImportForm()
        data = {'form': form}

        return render(request, 'admin/csv_upload.html', data)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('apartment', 'check_in_date', 'check_out_date')
