from django.contrib import admin

from .models import Payment

class PaymentAdmin(admin.ModelAdmin):
    list_display = ['name', 'address', 'status', 'date_joined']
admin.site.register(Payment)

