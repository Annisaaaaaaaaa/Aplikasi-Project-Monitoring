from django.urls import path

from . import views_api
<<<<<<< HEAD
from .views_api import ClientRetrieveUpdate, ClientListSearch, ClientList, ClientDestroy, export_clients_to_excel
=======
from .views_api import ClientRetrieveUpdate, ClientListSearch, export_clients_to_excel, ClientDestroy
>>>>>>> 9538a83761647d38049a93a353d44b0b187e73fa

urlpatterns = [
    path('', views_api.ClientListCreate.as_view(), name='client-list-create'),
    path('edit/<int:pk>/', ClientRetrieveUpdate.as_view(), name='client-retrieve-update'),
    path('search/', ClientListSearch.as_view(), name='client-list-search'),
    path('export-clients-to-excel/', export_clients_to_excel, name='export-clients-to-excel'),
    path('<int:pk>/delete/', ClientDestroy.as_view(), name='client-destroy'),  
]