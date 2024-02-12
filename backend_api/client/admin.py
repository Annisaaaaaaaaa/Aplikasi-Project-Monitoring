from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Client

class ClientResource(resources.ModelResource):
    class Meta:
        model = Client

class ClientAdmin(ImportExportModelAdmin):
    resource_class = ClientResource
    list_display = ['name', 'address', 'status', 'date_joined']
    list_filter = ('status',)
    search_fields = ('name', 'address', 'status')
    ordering = ['-date_joined', 'name']

admin.site.register(Client, ClientAdmin)
