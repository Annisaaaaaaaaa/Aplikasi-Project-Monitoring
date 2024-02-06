from rest_framework import generics, filters
from .models import Payment
from .serializers import PaymentSerializer

from django.http import HttpResponse
from openpyxl import Workbook
from .models import Payment

def export_payments_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Get all field names from the Payment model
    field_names = [field.name for field in Payment._meta.get_fields() if not field.is_relation]

    # Write headers to the worksheet
    ws.append(field_names)

    payments = Payment.objects.all()

    # Write data to the worksheet
    for payment in payments:
        # Convert payment_date to string without timezone information
        payment_date_str = payment.payment_date.strftime('%Y-%m-%d %H:%M:%S')

        # Create a list with formatted values
        row_data = [getattr(payment, field) if field != 'payment_date' else payment_date_str for field in field_names]

        ws.append(row_data)

    # Create a response with the Excel file
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=payments.xlsx'
    wb.save(response)

    return response

#Create dan List
class PaymentListCreate(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

# Edit
class PaymentRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

# Search
class PaymentListSearch(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'payer_name'] 