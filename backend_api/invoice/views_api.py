from rest_framework import generics, filters
from .models import Invoice
from .serializers import InvoiceSerializer

from django.http import HttpResponse
from openpyxl import Workbook

from openpyxl.styles import NamedStyle, Font
from django.http import FileResponse
import tempfile

def export_invoices_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Define column names manually
    field_names = ['Project', 'To Contact', 'Sent Date', 'Due Date', 'Date', 'Amount', 'Status', 'Note', 'Download Link']

    # Write headers to the worksheet
    ws.append(field_names[:-1])  

    invoices = Invoice.objects.all()

    # Create a named style for hyperlinks
    hyperlink_style = NamedStyle(name='hyperlink_style', font=Font(color="0000FF", underline='single'))

    # Write data to the worksheet
    for invoice, row_num in zip(invoices, range(2, len(invoices) + 2)):
        # Convert date fields to string without timezone information
        sent_date_str = invoice.sent_date.strftime('%Y-%m-%d') if invoice.sent_date else ''
        due_date_str = invoice.due_date.strftime('%Y-%m-%d') if invoice.due_date else ''
        date_str = invoice.date.strftime('%Y-%m-%d') if invoice.date else ''

        # Create a list with formatted values
        row_data = [
            invoice.project.name if invoice.project else '',
            invoice.to_contact.name if invoice.to_contact else '',
            sent_date_str,
            due_date_str,
            date_str,
            str(invoice.amount) if invoice.amount else '',
            invoice.get_status_display(),
            invoice.note if invoice.note else '',
            request.build_absolute_uri(invoice.document_file.url),  
        ]

        for col_num, value in enumerate(row_data):
            ws.cell(row=row_num, column=col_num + 1).value = value

        # Add a hyperlink to the 'Download Link' column
        download_link_cell = ws.cell(row=row_num, column=len(field_names)).value
        ws.cell(row=row_num, column=len(field_names)).hyperlink = download_link_cell
        ws.cell(row=row_num, column=len(field_names)).style = hyperlink_style

    # Save workbook to a temporary file
    tmp_file = tempfile.NamedTemporaryFile(delete=False)
    wb.save(tmp_file.name)
    tmp_file.close()

    # Serve the file using Django FileResponse
    response = FileResponse(open(tmp_file.name, 'rb'), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=invoices.xlsx'

    return response

#Create dan List
class InvoiceListCreate(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# Edit
class InvoiceRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# Delete
class InvoiceDestroy(generics.DestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# Search
class InvoiceListSearch(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'project'] 