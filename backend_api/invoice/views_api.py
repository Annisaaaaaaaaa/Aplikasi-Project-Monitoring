from rest_framework import generics, filters
from rest_framework.response import Response
from .models import Invoice
from .serializers import InvoiceSerializer

from django.http import HttpResponse
from openpyxl import Workbook

from openpyxl.styles import NamedStyle, Font
from django.http import FileResponse
import tempfile


import csv
from django.http import HttpResponse

def export_invoices_to_csv(request):
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=invoices.csv'

    # Create a CSV writer using the HttpResponse object as the "file."
    writer = csv.writer(response)

    # Write the header row to the CSV file
    field_names = ['Project', 'To Contact', 'Sent Date', 'Due Date', 'Date', 'Amount', 'Status', 'Note', 'Download Link']
    writer.writerow(field_names[:-1])  # Exclude the 'Download Link' field

    invoices = Invoice.objects.all()

    # Write data rows to the CSV file
    for invoice in invoices:
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
            request.build_absolute_uri(invoice.document_file.url),  # Download Link
        ]

        # Write the row to the CSV file
        writer.writerow(row_data[:-1])  # Exclude the 'Download Link' field

    return response


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


# ASC, DSC
class InvoiceList(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def list(self, request, *args, **kwargs):
        # Mendapatkan nilai 'order_by' dan 'order' dari parameter query string
        order_by = request.query_params.get('order_by', 'status')
        order = request.query_params.get('order', 'asc')

        # Validasi nilai 'order'
        if order not in ['asc', 'desc']:
            return Response({"error": "Invalid order value. Use 'asc' or 'desc'."}, status=400)

        # Validasi nilai 'order_by'
        valid_order_by_fields = ['status', 'project_id', 'due_date']  
        if order_by not in valid_order_by_fields:
            return Response({"error": f"Invalid order_by value. Use one of {valid_order_by_fields}."}, status=400)

        # Mengurutkan queryset berdasarkan bidang yang dipilih
        queryset = self.filter_queryset(self.get_queryset().order_by(f"{'-' if order == 'desc' else ''}{order_by}"))

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)