# admin.py
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Payment

class PaymentResource(resources.ModelResource):
    class Meta:
        model = Payment

class PaymentAdmin(ImportExportModelAdmin):
    resource_class = PaymentResource
    list_display = ['project', 'payment_date', 'amount', 'payer_name', 'receiver_name']
    list_filter = ('project', 'payment_date')
    search_fields = ('project__name', 'payer_name', 'receiver_name')
    ordering = ['payment_date', 'project']

admin.site.register(Payment, PaymentAdmin)
