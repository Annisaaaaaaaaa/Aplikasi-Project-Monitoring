from django.urls import path

from . import views_api
from .views_api import ProjectRetrieveUpdate, ProjectListSearch, ProjectDestroy, ProjectList, export_projects_to_excel, export_projects_to_pdf, export_projects_to_csv, export_projects_to_json, import_from_excel, import_from_csv, import_from_json, import_from_pdf

urlpatterns = [
    path('', views_api.ProjectListCreate.as_view(), name='project-list-create'),
    path('edit/<int:pk>/', ProjectRetrieveUpdate.as_view(), name='project-retrieve-update'),
    path('search/', ProjectListSearch.as_view(), name='project-list-search'),
    path('delete/<int:pk>/', ProjectDestroy.as_view(), name='project-destroy'),  
    path('order/', ProjectList.as_view(), name='project-list'),
    path('import-projects-from-pdf/', import_from_pdf, name='import-projects-from-pdf'),
    path('import-projects-from-excel/', import_from_excel, name='import-projects-from-excel'),
    path('import-projects-from-csv/', import_from_csv, name='import-projects-from-csv'),
    path('import-projects-from-json/', import_from_json, name='import-projects-from-json'),
    path('export-projects-to-excel/', export_projects_to_excel, name='export-projects-to-excel'),
    path('export-projects-to-csv/', export_projects_to_csv, name='export-projects-to-csv'),
    path('export-projects-to-json/', export_projects_to_json, name='export-projects-to-json'),
    path('export-projects-to-pdf/', export_projects_to_pdf, name='export-projects-to-pdf'),
]