from django.urls import path

from . import views_api
from .views_api import ClientRetrieveUpdate, ClientListSearch, ClientList, ClientDestroy, export_clients_to_excel, import_from_excel, import_from_csv, import_from_json, import_from_pdf, export_clients_to_csv, export_clients_to_json, export_clients_to_pdf

urlpatterns = [
    path('', views_api.ClientListCreate.as_view(), name='client-list-create'),
    path('edit/<int:pk>/', ClientRetrieveUpdate.as_view(), name='client-retrieve-update'),
    path('search/', ClientListSearch.as_view(), name='client-list-search'),
    path('delete/<int:pk>/', ClientDestroy.as_view(), name='client-destroy'),  
    path('order/', ClientList.as_view(), name='client-list'),
    path('import-clients-from-pdf/', import_from_pdf, name='import-clients-from-pdf'),
    path('import-clients-from-excel/', import_from_excel, name='import-clients-from-excel'),
    path('import-clients-from-csv/', import_from_csv, name='import-clients-from-csv'),
    path('import-clients-from-json/', import_from_json, name='import-clients-from-json'),
    path('export-clients-to-excel/', export_clients_to_excel, name='export-clients-to-excel'),
    path('export-clients-to-csv/', export_clients_to_csv, name='export-clients-to-csv'),
    path('export-clients-to-json/', export_clients_to_json, name='export-clients-to-json'),
    path('export-clients-to-pdf/', export_clients_to_pdf, name='export-clients-to-pdf'),
]