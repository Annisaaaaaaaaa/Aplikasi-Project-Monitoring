from django.contrib import admin

from .models import ProjectDocument

class ProjectDocumentAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'status', 'date_joined']
admin.site.register(ProjectDocument)

