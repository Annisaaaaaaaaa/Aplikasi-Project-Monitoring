# Generated by Django 5.0.2 on 2024-03-14 20:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aktivitas_project', '0003_remove_aktivitiesproject_backend_and_more'),
        ('api', '0010_remove_profile_is_active_alter_user_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='aktivitiesproject',
            name='engineers',
            field=models.ManyToManyField(related_name='activities', through='aktivitas_project.EngineerActivity', to='api.profile'),
        ),
        migrations.AlterField(
            model_name='engineeractivity',
            name='activity',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='engineer_activities', to='aktivitas_project.aktivitiesproject'),
        ),
    ]
