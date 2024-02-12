from django.urls import path

from . import views_api
<<<<<<< HEAD
from .views_api import ProjectRetrieveUpdate, ProjectListSearch, ProjectDestroy, ProjectList, export_projects_to_excel
=======
from .views_api import ProjectRetrieveUpdate, ProjectListSearch, export_projects_to_excel, ProjectDestroy
>>>>>>> 9538a83761647d38049a93a353d44b0b187e73fa

urlpatterns = [
    path('', views_api.ProjectListCreate.as_view(), name='project-list-create'),
    path('edit/<int:pk>/', ProjectRetrieveUpdate.as_view(), name='project-retrieve-update'),
    path('search/', ProjectListSearch.as_view(), name='project-list-search'),
    path('export-projects-to-excel/', export_projects_to_excel, name='export-projects-to-excel'),
    path('<int:pk>/delete/', ProjectDestroy.as_view(), name='project-destroy'),  
<<<<<<< HEAD
    path('order/', ProjectList.as_view(), name='project-list'),
=======
>>>>>>> 9538a83761647d38049a93a353d44b0b187e73fa
]