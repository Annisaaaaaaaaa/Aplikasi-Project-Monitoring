from django.urls import path

from . import views_api
from .views_api import PaymentRetrieveUpdate, PaymentListSearch, PaymentDestroy, export_payments_to_excel

urlpatterns = [
    path('', views_api.PaymentListCreate.as_view(), name='payment-list-create'),
    path('edit/<int:pk>/', PaymentRetrieveUpdate.as_view(), name='payment-retrieve-update'),
    path('search/', PaymentListSearch.as_view(), name='payment-list-search'),
    path('export-payments-to-excel/', export_payments_to_excel, name='export-payments-to-excel'),
    path('<int:pk>/delete/', PaymentDestroy.as_view(), name='payment-destroy'),  
]