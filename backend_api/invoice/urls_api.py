from django.urls import path

from . import views_api
from .views_api import InvoiceRetrieveUpdate, InvoiceListSearch, InvoiceDestroy, InvoiceList, export_invoices_to_excel, export_invoices_to_csv, export_invoices_to_json, export_invoices_to_pdf

urlpatterns = [
    path('', views_api.InvoiceListCreate.as_view(), name='invoice-list-create'),
    path('filter/', views_api.InvoiceListFilterByMonthYear.as_view(), name='invoice-list-filter'),
    path('<int:pk>/', views_api.InvoiceDetail.as_view(), name='invoice-list-detail'),
    path('bystatus/', views_api.InvoiceListFilterByStatus.as_view(), name='invoice-filter-status'),
    path('bytype/', views_api.InvoiceListFilterByType.as_view(), name='invoice-filter-type'),
    path('count/', views_api.InvoiceCount.as_view(), name='invoice-count'),
    path('edit/<int:pk>/', InvoiceRetrieveUpdate.as_view(), name='invoice-retrieve-update'),
    path('search/', InvoiceListSearch.as_view(), name='invoice-list-search'),
    path('export-invoices-to-excel/', export_invoices_to_excel, name='export-invoices-to-excel'),
    path('export-invoices-to-csv/', export_invoices_to_csv, name='export-invoices-to-csv'),
    path('export-invoices-to-json/', export_invoices_to_json, name='export-invoices-to-json'),
    path('export-invoices-to-pdf/', export_invoices_to_pdf, name='export-invoices-to-pdf'),
    path('import-invoices/', views_api.import_invoices, name='import-invoices'),
    path('delete/<int:pk>/', InvoiceDestroy.as_view(), name='payment-destroy'),  
    path('order/', InvoiceList.as_view(), name='project-document-list'),
]