from django.contrib import admin
from import_export import resources
from .models import EngineerWorkload
from import_export.admin import ImportExportModelAdmin

class WorkloadResource(resources.ModelResource):
    class Meta:
        model = EngineerWorkload

class WorkloadAdmin(ImportExportModelAdmin):
    resource_class = WorkloadResource
    list_display = ['engineer', 'project', 'percent_allocation']
    list_filter = ('project',)
    search_fields = ('engineer', 'project')
    ordering = ['-created_at', 'engineer']

admin.site.register(EngineerWorkload, WorkloadAdmin)
