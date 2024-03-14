# views_api.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import EngineerWorkload
from api.models import User
from project.models import Project
from aktivitas_project.models import AktivitiesProject

@api_view(['GET'])
def calculate_user_workload(request, user_id):
    try:
        # Mendapatkan instance pengguna berdasarkan ID
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Menghitung total workload dari proyek yang diambil oleh pengguna
    total_project_workload = 0
    for project in user.projects.all():
        total_project_workload += project.beban_proyek

    # Menghitung total workload dari aktivitas proyek yang diambil oleh pengguna
    total_activity_workload = 0
    for activity in user.activities.all():
        total_activity_workload += activity.tanggung_jawab

    # Menghitung total workload
    total_workload = total_project_workload + total_activity_workload

    # Memperbarui atau membuat entri workload pengguna dalam database
    user_workload, created = EngineerWorkload.objects.get_or_create(user=user)
    user_workload.tanggung_jawab = total_workload
    user_workload.save()

    return Response({'user_id': user_id, 'workload': total_workload})
