from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Invoice


class InvoiceResource(resources.ModelResource):
    class Meta:
        model = Invoice


class InvoiceAdmin(ImportExportModelAdmin):
    resource_class = InvoiceResource
    list_display = ['project', 'to_contact', 'due_date', 'amount', 'status']
    list_filter = ('project', 'to_contact', 'status')
    search_fields = ('project__name', 'to_contact__name', 'status')
    ordering = ['due_date', 'project']

admin.site.register(Invoice, InvoiceAdmin)
