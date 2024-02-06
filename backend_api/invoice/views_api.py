from rest_framework import generics, filters
from .models import Invoice
from .serializers import InvoiceSerializer

from django.http import HttpResponse
from openpyxl import Workbook

def export_invoices_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Write headers to the worksheet
    headers = ['id', 'project']  # Replace with your actual field names
    ws.append(headers)

    invoices = Invoice.objects.all()

    # Write data to the worksheet
    for invoice in invoices:
        ws.append([invoice.id, invoice.project])  

    # Create a response with the Excel file
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=invoices.xlsx'
    wb.save(response)

    return response

#Create dan List
class InvoiceListCreate(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# Edit
class InvoiceRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

# Search
class InvoiceListSearch(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'project'] 