from django.core.files.uploadedfile import SimpleUploadedFile

from rest_framework.test import APITestCase
import pandas as pd

from accounts.models import ClientUser

HEADER = ['uuid', 'title', 'price', 'image', 'coordinates', 'description']
VALID_ROWS = [['bf15d95d-3744-4daa-82cf-fe5c8979ac87', 'Victoria & SPA Minsk', '81', 'IMG-4.jpg',
               '53.92284117,27.52537072', 'asfdsgsdsfsdas'],
              ['7ec60b61-7823-413a-b2d1-ecefb2e7d26c', 'HOTEL', '33', 'IMG-5.jpg', '53.91143574,27.54683375',
               'fsggdffssdfd']]


class UploadCSV(APITestCase):

    @staticmethod
    def generate_file(row, name, header=None):
        my_file = pd.DataFrame(row, columns=header)
        my_file.to_csv(name, index=False, sep=';')
        file = SimpleUploadedFile(name=name, content=open(name, 'rb').read(),
                                  content_type='multipart/form-data')
        return file

    def setUp(self):
        self.admin = ClientUser.objects.create_superuser(email="user@example.com", password="superUser22")
        self.client.login(email=self.admin.email, password=self.admin.password)
        self.url = url = 'http://localhost:8000/admin/apartments/apartment/upload-csv/'

    def test_invalid_row_in_file(self):
        invalid_row_file = self.generate_file([['1', '2', '3', '4', '5', '6'], ], 'apartments_one.csv', HEADER)

        response = self.client.post(self.url, data={'csv_upload': invalid_row_file})
        self.assertEqual(str(list(response.context['messages'])[0]),
                         'The format of the data in the csv file does not fit')

    def test_invalid_header_in_file(self):
        invalid_header_file = self.generate_file([['aaaaa', 'bbbbb'], ['ccccc', 'vvvvvvv']], 'apartments_two.csv')

        response = self.client.post(self.url, data={'csv_upload': invalid_header_file})
        self.assertEqual(str(list(response.context['messages'])[0]),
                         'The csv file has no field name header')

    def test_valid_file(self):
        for _ in range(2):
            valid_file = self.generate_file(VALID_ROWS, 'apartments_three.csv', HEADER)
            response = self.client.post(self.url, data={'csv_upload': valid_file})
        self.assertEqual(str(list(response.context['messages'])[0]),
                         'Your csv file has been imported')

    def test_similar_files(self):
        for _ in range(3):
            file = self.generate_file(VALID_ROWS, 'apartments_four.csv', HEADER)
            response = self.client.post(self.url, data={'csv_upload': file})
        self.assertEqual(str(list(response.context['messages'])[0]),
                         'All such records already exist in the database')
