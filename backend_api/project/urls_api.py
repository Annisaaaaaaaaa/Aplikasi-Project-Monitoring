from django.urls import path

from . import views_api
from .views_api import ProjectRetrieveUpdate, ProjectListSearch, ProjectDestroy, ProjectList, export_projects_to_excel, export_projects_to_pdf, export_projects_to_csv, export_projects_to_json, import_projects

urlpatterns = [
    path('', views_api.ProjectListCreate.as_view(), name='project-list-create'),
    path('edit/<int:pk>/', ProjectRetrieveUpdate.as_view(), name='project-retrieve-update'),
    path('search/', ProjectListSearch.as_view(), name='project-list-search'),
    path('delete/<int:pk>/', ProjectDestroy.as_view(), name='project-destroy'),  
    path('order/', ProjectList.as_view(), name='project-list'),
    path('export-projects-to-excel/', export_projects_to_excel, name='export-projects-to-excel'),
    path('export-projects-to-csv/', export_projects_to_csv, name='export-projects-to-csv'),
    path('export-projects-to-json/', export_projects_to_json, name='export-projects-to-json'),
    path('export-projects-to-pdf/', export_projects_to_pdf, name='export-projects-to-pdf'),
    path('import-projects/', views_api.import_projects, name='import-projects'),

]