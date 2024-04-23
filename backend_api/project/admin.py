from django.contrib import admin
from .models import Project, EngineerProject

class EngineerProjectAdminInline(admin.TabularInline):
    model = EngineerProject
    extra = 1 

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'pid', 'year', 'customer', 'sales', 'am', 'pm', 'start_date', 'end_date', 'completion_percentage')
    search_fields = ('name', 'pid', 'customer__name', 'sales__username', 'am__username', 'pm__username')
    list_filter = ('year', 'customer', 'sales', 'am', 'pm')
    inlines = [EngineerProjectAdminInline]

    fieldsets = (
        (None, {
            'fields': ('name', 'pid', 'year', 'customer', 'sales', 'am', 'pm')
        }),
        ('Project Details', {
            'fields': ('description', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date', 'start_date', 'end_date', 'status', 'top', 'sow', 'oos', 'detail', 'remarks', 'priority', 'type', 'market_segment', 'tech_use', 'resiko')
        }),
        ('Workload', {
            'fields': ('beban_proyek',)
        }),
    )

@admin.register(EngineerProject)
class EngineerProjectAdmin(admin.ModelAdmin):
    list_display = ('project', 'engineer', 'presentase_beban_kerja')
    search_fields = ('project__name', 'engineer__username')
    list_filter = ('project', 'engineer')

