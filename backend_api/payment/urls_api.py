from django.urls import path

from . import views_api
from .views_api import PaymentRetrieveUpdate, PaymentListSearch, PaymentDestroy, PaymentList, export_payments_to_excel, export_payments_to_csv, export_payments_to_json, export_payments_to_pdf, import_payments

urlpatterns = [
    path('', views_api.PaymentListCreate.as_view(), name='payment-list-create'),
    path('edit/<int:pk>/', PaymentRetrieveUpdate.as_view(), name='payment-retrieve-update'),
    path('search/', PaymentListSearch.as_view(), name='payment-list-search'),
    path('export-payments-to-excel/', export_payments_to_excel, name='export-payments-to-excel'),
    path('export-payments-to-csv/', export_payments_to_csv, name='export-payments-to-csv'),
    path('export-payments-to-json/', export_payments_to_json, name='export-payments-to-json'),
    path('export-payments-to-pdf/', export_payments_to_pdf, name='export-payments-to-pdf'),
    path('import-payments/', views_api.import_payments, name='import-payments'),

    path('delete/<int:pk>/', PaymentDestroy.as_view(), name='payment-destroy'),  
    path('order/', PaymentList.as_view(), name='project-document-list'),
]