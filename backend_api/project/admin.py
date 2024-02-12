# admin.py
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Project

class ProjectResource(resources.ModelResource):
    class Meta:
        model = Project

class ProjectAdmin(ImportExportModelAdmin):
    resource_class = ProjectResource
    list_display = ['name', 'year', 'customer', 'sales', 'start_date', 'end_date', 'status', 'priority']
    list_filter = ('customer', 'sales', 'status', 'priority')
    search_fields = ('name', 'customer__name', 'sales__username', 'status', 'priority')
    ordering = ['customer', 'name']

admin.site.register(Project, ProjectAdmin)
