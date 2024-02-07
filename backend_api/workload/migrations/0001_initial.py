# Generated by Django 4.0.1 on 2024-02-07 07:58

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('project', '0005_alter_project_pid_alter_project_year'),
        ('api', '0009_alter_user_options_profile_address_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EngineerWorkload',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('default_allocation', models.FloatField(default=100)),
                ('percent_allocation', models.FloatField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(200)])),
                ('created_at', models.DateTimeField(db_index=True, default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('engineer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.project')),
            ],
            options={
                'verbose_name': "Engineer's Worklod",
                'db_table': 'apm_workload',
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddIndex(
            model_name='engineerworkload',
            index=models.Index(fields=['-created_at'], name='apm_workloa_created_9f1c50_idx'),
        ),
    ]
