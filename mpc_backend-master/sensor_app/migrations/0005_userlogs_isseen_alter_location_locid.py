# Generated by Django 4.1.1 on 2023-04-20 05:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sensor_app", "0004_location_username_alter_location_locid_userlogs"),
    ]

    operations = [
        migrations.AddField(
            model_name="userlogs",
            name="isSeen",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="location",
            name="locId",
            field=models.CharField(
                default="LOC42348", editable=False, max_length=50, unique=True
            ),
        ),
    ]
