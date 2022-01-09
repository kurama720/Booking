import pandas as pd

from django.contrib import admin, messages
from django.core.exceptions import ValidationError, ObjectDoesNotExist
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

            file_data = pd.read_csv(csv_file, sep=';')
            row_iter = file_data.iterrows()
            try:
                apartments: list[Apartment] = [
                    Apartment(id=row['id'],
                              title=row['title'],
                              price=row['price'],
                              img=row['image'],
                              lat=row['coordinates'].split(',')[0],
                              lon=row['coordinates'].split(',')[1],
                              description=row['description'])
                    for _, row in row_iter if not Apartment.objects.filter(id=row[0]).exists()
                ]
                if not apartments:
                    raise ObjectDoesNotExist
                Apartment.objects.bulk_create(apartments)  # Adding data to the database
                self.message_user(request, "Your csv file has been imported")
                url = reverse('admin:index')
                return HttpResponseRedirect(url)
            except ValidationError:
                self.message_user(request, "The format of the data in the csv file does not fit", level=messages.WARNING)
            except ObjectDoesNotExist:
                self.message_user(request, "All such records already exist in the database", level=messages.WARNING)

        form = CsvImportForm()
        data = {'form': form}

        return render(request, 'admin/csv_upload.html', data)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('apartment', 'check_in_date', 'check_out_date')
