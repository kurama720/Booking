# Generated by Django 3.1.13 on 2022-02-02 17:46

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('apartments', '0020_auto_20220202_1746'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApartmentGeoWrapper',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, db_index=True, geography=True, null=True, srid=4326, unique=True)),
                ('hotel', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='apartments.apartment')),
            ],
        ),
    ]
