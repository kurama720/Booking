# Generated by Django 3.1.13 on 2022-01-31 17:44

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('location', django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326, unique=True)),
            ],
            options={
                'verbose_name_plural': 'Cities',
            },
        ),
        migrations.AddIndex(
            model_name='city',
            index=models.Index(fields=['name'], name='cities_city_name_a4d1d7_idx'),
        ),
    ]
