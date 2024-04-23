from django.contrib import admin
from .models import Workload

class WorkloadAdmin(admin.ModelAdmin):
    list_display = ('user', 'default_allocation', 'project_contribution', 'activity_contribution', 'total_workload', 'workload_percentage')
    readonly_fields = ('project_contribution', 'activity_contribution', 'total_workload', 'created_at', 'updated_at')

    def workload_percentage(self, obj):
        return obj.calculate_workload_percentage()
    workload_percentage.short_description = 'Workload Percentage'

admin.site.register(Workload, WorkloadAdmin)
