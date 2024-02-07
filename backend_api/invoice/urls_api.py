from django.urls import path

from . import views_api
from .views_api import InvoiceRetrieveUpdate, InvoiceListSearch, InvoiceDestroy, InvoiceList, export_invoices_to_excel

urlpatterns = [
    path('', views_api.InvoiceListCreate.as_view(), name='invoice-list-create'),
    path('edit/<int:pk>/', InvoiceRetrieveUpdate.as_view(), name='invoice-retrieve-update'),
    path('search/', InvoiceListSearch.as_view(), name='invoice-list-search'),
    path('export-invoices-to-excel/', export_invoices_to_excel, name='export-invoices-to-excel'),
    path('<int:pk>/delete/', InvoiceDestroy.as_view(), name='payment-destroy'),  
    path('order/', InvoiceList.as_view(), name='project-document-list'),
]