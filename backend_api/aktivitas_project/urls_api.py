from django.urls import path
from . import views
from .views import AktivitiesProjectViewSet, UserDeleteView, ActivityListSearch, AktivitiesProjectListView, ExportAktivitiesProjectExcel, AktivitiesProjectDetailView, AktivitiesProjectRetrieveUpdateView

urlpatterns = [
    path('engineer-activities/', views.AktivitiesProjectViewSet.as_view(), name='engineer_activity_list'),

    path('delete/<int:pk>/', UserDeleteView.as_view(), name='user_delete'),

    path('search/', ActivityListSearch.as_view(), name='user-list-search'),

    path('filter_status/', AktivitiesProjectListView.as_view(), name='activities-list'),

    path('aktivitas-project/<int:pk>/', AktivitiesProjectDetailView.as_view(), name='aktivitas-project-detail'),

    path('edit/<int:pk>/', AktivitiesProjectRetrieveUpdateView.as_view(), name='aktivitas-project-edit'),

    path('export_excel/', ExportAktivitiesProjectExcel.as_view(), name='export_aktivitas_projects'),




    # path('stakeholder-activities/', views.stakeholder_activity_list, name='stakeholder_activity_list'),
    # path('activities/', views.aktivities_project_list, name='aktivities_project_list'),
]
