# Generated by Django 3.1.13 on 2022-01-12 08:14

import apartments.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartments', '0007_auto_20220111_1654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apartment',
            name='img',
            field=models.ImageField(upload_to=apartments.models.apartment_directory_path),
        ),
    ]