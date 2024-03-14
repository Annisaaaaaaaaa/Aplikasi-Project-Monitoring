from django.urls import path
from . import views_api

urlpatterns = [
    path('users/<int:user_id>/workload/', views_api.user_workload),
]
