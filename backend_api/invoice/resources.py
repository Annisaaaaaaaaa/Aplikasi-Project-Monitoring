# resources.py
from import_export import resources
from .models import Invoice

class InvoiceResource(resources.ModelResource):
    class Meta:
        model = Invoice
        fields = (
            'project', 'to_contact', 'sent_date', 'due_date', 'date',
            'amount', 'status', 'note', 'document_file',
        )
        export_order = fields
        skip_unchanged = True
        report_skipped = False
