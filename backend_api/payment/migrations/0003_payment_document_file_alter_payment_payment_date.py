# Generated by Django 4.0.1 on 2024-02-07 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_alter_payment_options_alter_payment_table'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='document_file',
            field=models.FileField(null=True, upload_to='doc/payment/'),
        ),
        migrations.AlterField(
            model_name='payment',
            name='payment_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
