from django import forms


class CsvImportForm(forms.Form):
    """Form for downloading a csv file"""
    csv_upload = forms.FileField()
