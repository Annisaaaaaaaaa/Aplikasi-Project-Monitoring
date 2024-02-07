from rest_framework import generics, filters
from .models import Payment
from .serializers import PaymentSerializer

from django.http import HttpResponse
from openpyxl import Workbook
from .models import Payment

from openpyxl.styles import NamedStyle, Font
from django.http import FileResponse
import tempfile

def export_payments_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Define column names manually
    field_names = ['Project', 'Payment Date', 'Amount', 'Note', 'Payer Name', 'Payer Account Number', 'Receiver Name', 'Receiver Account Number', 'Download Link']

    # Write headers to the worksheet
    ws.append(field_names[:-1]+ ['document_file'])  

    payments = Payment.objects.all()

    # Create a named style for hyperlinks
    hyperlink_style = NamedStyle(name='hyperlink_style', font=Font(color="0000FF", underline='single'))

    # Write data to the worksheet
    for payment, row_num in zip(payments, range(2, len(payments) + 2)):
        # Convert payment_date to string without timezone information
        payment_date_str = payment.payment_date.strftime('%Y-%m-%d') if payment.payment_date else ''

        # Create a list with formatted values
        row_data = [
            payment.project.name if payment.project else '',
            payment_date_str,
            str(payment.amount) if payment.amount else '',
            payment.note if payment.note else '',
            payment.payer_name if payment.payer_name else '',
            payment.payer_account_number if payment.payer_account_number else '',
            payment.receiver_name if payment.receiver_name else '',
            payment.receiver_account_number if payment.receiver_account_number else '',
            request.build_absolute_uri(payment.document_file.url) if payment.document_file else '',
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
    response['Content-Disposition'] = 'attachment; filename=payments.xlsx'

    return response

#Create dan List
class PaymentListCreate(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

# Edit
class PaymentRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


# Delete
class PaymentDestroy(generics.DestroyAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


# Search
class PaymentListSearch(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'payer_name'] 