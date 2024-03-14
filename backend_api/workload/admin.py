# app/admin.py

from django.contrib import admin
from .models import Workload

class WorkloadAdmin(admin.ModelAdmin):
    list_display = ('user', 'default_allocation', 'project_contribution', 'activity_contribution', 'total_workload', 'workload_percentage', 'created_at', 'updated_at')
    list_filter = ('user',)
    search_fields = ('user__username', 'user__full_name')

    def workload_percentage(self, obj):
        return obj.calculate_workload_percentage()
    workload_percentage.short_description = 'Workload Percentage'

admin.site.register(Workload, WorkloadAdmin)
