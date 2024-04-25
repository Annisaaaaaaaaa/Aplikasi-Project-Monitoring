from import_export import resources
from .models import Project

class ProjectResource(resources.ModelResource):
    class Meta:
        model = Project
        fields = (
            'year', 'pid', 'name', 'description', 'customer',
            'sales', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date',
            'am', 'pic', 'pm', 'start_date', 'end_date',
            'status', 'top', 'sow', 'oos', 'detail',
            'remarks', 'priority', 'type', 'market_segment',
            'tech_use', 'resiko', 'beban_proyek'
        )
        export_order = fields
        skip_unchanged = True
        report_skipped = False
        import_id_fields = []  # Menyatakan bahwa tidak ada bidang 'id' yang diimpor
