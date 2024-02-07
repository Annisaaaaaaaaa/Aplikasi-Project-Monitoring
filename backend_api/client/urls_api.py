from django.urls import path

from . import views_api
from .views_api import ClientRetrieveUpdate, ClientListSearch, export_clients_to_excel, ClientDestroy

urlpatterns = [
    path('', views_api.ClientListCreate.as_view(), name='client-list-create'),
    path('edit/<int:pk>/', ClientRetrieveUpdate.as_view(), name='client-retrieve-update'),
    path('search/', ClientListSearch.as_view(), name='client-list-search'),
    path('export-clients-to-excel/', export_clients_to_excel, name='export-clients-to-excel'),
    path('<int:pk>/delete/', ClientDestroy.as_view(), name='client-destroy'),  
]