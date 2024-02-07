from rest_framework import generics, filters
from .models import Client
from .serializers import ClientSerializer

from django.http import HttpResponse
from openpyxl import Workbook
from .models import Client

def export_clients_to_excel(request):
    # Create a new Excel workbook and add a worksheet
    wb = Workbook()
    ws = wb.active

    # Write headers to the worksheet
    headers = ['ID', 'Name']  # Replace with your actual field names
    ws.append(headers)

    clients = Client.objects.all()

    # Write data to the worksheet
    for client in clients:
        ws.append([client.id, client.name])  

    # Create a response with the Excel file
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=clients.xlsx'
    wb.save(response)

    return response

#Create dan List
class ClientListCreate(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

# Edit
class ClientRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

# Search
class ClientListSearch(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['id', 'name'] 

class ClientDestroy(generics.DestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
