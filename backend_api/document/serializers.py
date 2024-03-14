from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import ProjectDocument
from api.models import User
from project.models import Project


# Serializers define the API representation.
class ProjectDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDocument
        fields = '__all__'
