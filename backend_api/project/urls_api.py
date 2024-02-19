from django.urls import path

from . import views_api
from .views_api import ProjectRetrieveUpdate, ProjectListSearch, ProjectDestroy, ProjectList, export_projects_to_excel

urlpatterns = [
    path('', views_api.ProjectListCreate.as_view(), name='project-list-create'),
    path('edit/<int:pk>/', ProjectRetrieveUpdate.as_view(), name='project-retrieve-update'),
    path('search/', ProjectListSearch.as_view(), name='project-list-search'),
    path('export-projects-to-excel/', export_projects_to_excel, name='export-projects-to-excel'),
    path('delete/<int:pk>/', ProjectDestroy.as_view(), name='project-destroy'),  
    path('order/', ProjectList.as_view(), name='project-list'),
]