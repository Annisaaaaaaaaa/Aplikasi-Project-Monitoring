from django.contrib import admin
from .models import AktivitiesProject, EngineerActivity

class EngineerActivityInline(admin.TabularInline):
    model = EngineerActivity
    extra = 1

@admin.register(AktivitiesProject)
class AktivitiesProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'pm', 'date_start', 'date_finish', 'status')
    search_fields = ('name', 'project__name', 'pm__user__username')
    list_filter = ('status',)
    inlines = [EngineerActivityInline]

    fieldsets = (
        (None, {
            'fields': ('name', 'project', 'pm', 'date_start', 'date_finish', 'description')
        }),
        ('Additional Information', {
            'fields': ('date_estimated', 'note', 'status')
        }),
        ('Workload', {
            'fields': ('tanggung_jawab',)
        }),
    )


@admin.register(EngineerActivity)
class EngineerActivityAdmin(admin.ModelAdmin):
    list_display = ('activity', 'engineer', 'persentase_beban_kerja', 'status') 
