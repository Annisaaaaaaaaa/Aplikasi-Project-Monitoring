# admin.py
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from .models import Project
from .models import Project, EngineerProject



class EngineerProjectInline(admin.TabularInline):
    model = EngineerProject
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'pid', 'year', 'customer', 'sales', 'am', 'pm', 'start_date', 'end_date')
    search_fields = ('name', 'pid', 'customer__name', 'sales__username', 'am__username', 'pm__username')
    list_filter = ('year', 'customer', 'sales', 'am', 'pm')
    inlines = [EngineerProjectInline]

    fieldsets = (
        (None, {
            'fields': ('name', 'pid', 'year', 'customer', 'sales', 'am', 'pm')
        }),
        ('Project Details', {
            'fields': ('start_date', 'end_date', 'status', 'top', 'sow', 'oos', 'detail', 'remarks', 'weight', 'priority', 'type', 'market_segment', 'tech_use', 'resiko')
        }),
        ('Workload', {
            'fields': ('beban_proyek', 'completion_percentage')
        }),
    )



