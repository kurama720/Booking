# Generated by Django 3.1.13 on 2022-01-03 13:15

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Apartment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False)),
                ('title', models.TextField()),
                ('price', models.PositiveIntegerField(db_index=True)),
                ('img', models.ImageField(upload_to='apartments/')),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
                ('description', models.TextField()),
                ('num_of_bedrooms', models.PositiveIntegerField(default=2)),
                ('rating', models.PositiveIntegerField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ('-rating',),
            },
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid1, editable=False, primary_key=True, serialize=False)),
                ('check_in_date', models.DateField(default=datetime.datetime.now)),
                ('check_out_date', models.DateField(default=datetime.datetime.now)),
                ('num_of_persons', models.PositiveIntegerField(default=1)),
                ('comment', models.TextField(blank=True)),
                ('apartment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apartments.apartment')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.clientuser')),
            ],
            options={
                'verbose_name': 'Booking',
                'verbose_name_plural': 'Booking',
                'ordering': ('apartment', 'check_in_date'),
                'unique_together': {('apartment', 'check_in_date', 'check_out_date')},
            },
        ),
    ]
