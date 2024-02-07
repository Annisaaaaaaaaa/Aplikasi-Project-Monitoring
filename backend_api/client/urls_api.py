from django.urls import path

from . import views_api
from .views_api import ClientRetrieveUpdate, ClientListSearch, ClientList, ClientDestroy, export_clients_to_excel

urlpatterns = [
    path('', views_api.ClientListCreate.as_view(), name='client-list-create'),
    path('edit/<int:pk>/', ClientRetrieveUpdate.as_view(), name='client-retrieve-update'),
    path('search/', ClientListSearch.as_view(), name='client-list-search'),
    path('export-clients-to-excel/', export_clients_to_excel, name='export-clients-to-excel'),
    path('<int:pk>/delete/', ClientDestroy.as_view(), name='document-destroy'),
    path('order/', ClientList.as_view(), name='project-document-list'),
]