# Generated by Django 4.1.1 on 2023-08-01 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sensor_app", "0012_alter_location_locid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="location",
            name="locId",
            field=models.CharField(
                default="LOC13686", editable=False, max_length=50, unique=True
            ),
        ),
    ]
