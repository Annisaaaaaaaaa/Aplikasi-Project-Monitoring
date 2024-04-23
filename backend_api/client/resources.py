# resources.py
from import_export import resources
from .models import Client

class ClientResource(resources.ModelResource):
    class Meta:
        model = Client
        fields = (
            'name', 'address', 'pic_phone', 'pic_email', 'pic_title',
            'industry', 'website_url', 'logo', 'company_size', 'company_address',
            'contact_person_name', 'company_email', 'company_phone', 'additional_info',
            'date_joined', 'status', 
        )
        export_order = fields
        skip_unchanged = True
        report_skipped = False
