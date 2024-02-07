from django.contrib import admin
from import_export import resources
from .models import AktivitiesProject
from import_export.admin import ImportExportModelAdmin

class ActivityResource(resources.ModelResource):
    class Meta:
        model = AktivitiesProject

class AcitivtyAdmin(ImportExportModelAdmin):
    resource_class = ActivityResource
    list_display = ['name', 'project', 'status', 'created_at']
    list_filter = ('status',)
    search_fields = ('name', 'project', 'status')
    ordering = ['-created_at', 'name']

admin.site.register(AktivitiesProject, AcitivtyAdmin)
