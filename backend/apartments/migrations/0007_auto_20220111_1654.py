# Generated by Django 3.1.13 on 2022-01-11 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartments', '0006_auto_20220110_1140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apartment',
            name='img',
            field=models.ImageField(upload_to=''),
        ),
    ]