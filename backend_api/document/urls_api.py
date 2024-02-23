from django.urls import path

from . import views_api
from .views_api import ProjectDocumentRetrieveUpdate, ProjectDocumentListSearch, ProjectDocumentDestroy, ProjectDocumentList, export_documents_to_excel, export_documents_to_csv, export_documents_to_json, export_documents_to_pdf

urlpatterns = [
    path('', views_api.ProjectDocumentListCreate.as_view(), name='document-list-create'),
    path('edit/<int:pk>/', ProjectDocumentRetrieveUpdate.as_view(), name='document-retrieve-update'),
    path('search/', ProjectDocumentListSearch.as_view(), name='document-list-search'),
    path('export-documents-to-excel/', export_documents_to_excel, name='export-documents-to-excel'),
    path('export-documents-to-csv/', export_documents_to_csv, name='export-documents-to-csv'),
    path('export-documents-to-json/', export_documents_to_json, name='export-documents-to-json'),
    path('export-documents-to-pdf/', export_documents_to_pdf, name='export-documents-to-pdf'),
    path('delete/<int:pk>/', ProjectDocumentDestroy.as_view(), name='document-destroy'),
    path('order/', ProjectDocumentList.as_view(), name='project-document-list'),
]