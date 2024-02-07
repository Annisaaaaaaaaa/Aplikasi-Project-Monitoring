from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import ProjectDocument


class ProjectDocumentResource(resources.ModelResource):  
    class Meta:
        model = ProjectDocument


class ProjectDocumentAdmin(ImportExportModelAdmin):
    resource_class = ProjectDocumentResource
    list_display = ['name', 'upload_date', 'project', 'uploader']
    list_filter = ('project', 'uploader', 'category')
    search_fields = ('name', 'category', 'description')
    ordering = ['name']  

admin.site.register(ProjectDocument, ProjectDocumentAdmin)
