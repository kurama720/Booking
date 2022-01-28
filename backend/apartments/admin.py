from collections import namedtuple
from os.path import join
from mimetypes import guess_type

import pandas as pd


from django.contrib import admin, messages
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.shortcuts import render

from apartments.models import Apartment, Booking, ApartmentReview, ApartmentsImage
from apartments.forms import CsvImportForm


@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    """A class for adding apartments to the admin panel"""
    list_display = ('title', 'price')
    ordering = ('price',)
    list_filter = ('rating',)
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
                self.message_user(request, 'The wrong file type was uploaded', level=messages.WARNING)
                return HttpResponseRedirect(request.path_info)

            file_data = pd.read_csv(csv_file, sep=';')
            row_iter = file_data.iterrows()
            try:
                apartments: list[Apartment] = [
                    Apartment(uuid=row['uuid'],
                              title=row['title'],
                              price=row['price'],
                              lat=row['coordinates'].split(',')[0],
                              lon=row['coordinates'].split(',')[1],
                              description=row['description'])
                    for _, row in row_iter if not Apartment.objects.filter(uuid=row['uuid']).exists()
                ]
                if not apartments:
                    raise ObjectDoesNotExist
                Apartment.objects.bulk_create(apartments)  # Adding data to the database
                row_iter = file_data.iterrows()
                images = []
                data_wrapper = namedtuple("data_wrapper", ["type", "content"])

                for apartment, row_data in zip(apartments, row_iter):
                    data = data_wrapper(*row_data)
                    with open(join("utils/scraping/images",
                                   data.content['image']),
                              "rb") as file:

                        images.append(ApartmentsImage(apartments=apartment,
                                                      img=SimpleUploadedFile(
                                                        name=data.content['image'],
                                                        content=file.read(),
                                                        content_type=guess_type(file.name))))

                ApartmentsImage.objects.bulk_create(images)
                self.message_user(request, "Your csv file has been imported")
                url = reverse('admin:index')
                return HttpResponseRedirect(url)
            except ValidationError:
                self.message_user(request,
                                  "The format of the data in the csv file does not fit",
                                  level=messages.WARNING)
            except ObjectDoesNotExist:
                self.message_user(request,
                                  "All such records already exist in the database",
                                  level=messages.WARNING)
            except KeyError:
                self.message_user(request,
                                  "The csv file has no field name header",
                                  level=messages.WARNING)
            except FileNotFoundError:
                self.message_user(request,
                                  """Necessary images data for csv upload not exists at server.
                                  Try to upload file later.""",
                                  level=messages.WARNING)

        form = CsvImportForm()
        data = {'form': form}

        return render(request, 'admin/csv_upload.html', data)


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('apartment', 'check_in_date', 'check_out_date')


@admin.register(ApartmentReview)
class ApartmentReviewsAdmin(admin.ModelAdmin):
    list_display = ('apartment', 'rate', 'comment')


@admin.register(ApartmentsImage)
class ApartmentsImageAdmin(admin.ModelAdmin):
    list_display = ('apartments', 'img')
