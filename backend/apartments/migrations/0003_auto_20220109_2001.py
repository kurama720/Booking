# Generated by Django 3.1.13 on 2022-01-09 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartments', '0002_auto_20220109_2001'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apartment',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
