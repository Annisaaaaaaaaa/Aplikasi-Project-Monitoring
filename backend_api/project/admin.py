from django.contrib import admin
from .models import Project, EngineerProject
from import_export.admin import ImportExportModelAdmin
from import_export import resources

class EngineerProjectAdminInline(admin.TabularInline):
    model = EngineerProject
    extra = 1

@admin.register(Project)
class ProjectAdmin(ImportExportModelAdmin):
    list_display = ('name', 'pid', 'year', 'customer', 'sales', 'am', 'pm', 'start_date', 'end_date')
    search_fields = ('name', 'pid', 'customer_name', 'salesusername', 'amusername', 'pm_username')
    list_filter = ('year', 'customer', 'sales', 'am', 'pm')
    inlines = [EngineerProjectAdminInline]

    fieldsets = (
        (None, {
            'fields': ('name', 'pid', 'year', 'customer', 'sales', 'am', 'pm')
        }),
        ('Project Details', {
            'fields': ('description', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date', 'start_date', 'end_date', 'status', 'top', 'sow', 'oos', 'detail', 'remarks', 'priority', 'type', 'market_segment', 'tech_use', 'resiko')  # Remove 'weight'
        }),
        ('Workload', {
            'fields': ('beban_proyek',)
        }),
    )


@admin.register(EngineerProject)
class EngineerProjectAdmin(ImportExportModelAdmin):
    list_display = ('project', 'engineer', 'presentase_beban_kerja')
    search_fields = ('project_name', 'engineer_username')
    list_filter = ('project', 'engineer')