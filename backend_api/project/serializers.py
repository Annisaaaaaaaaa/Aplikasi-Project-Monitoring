from django.urls import path, include
from .models import Project
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

