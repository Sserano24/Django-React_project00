# Generated by Django 4.2.18 on 2025-01-22 07:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='create_at',
            new_name='created_at',
        ),
    ]
