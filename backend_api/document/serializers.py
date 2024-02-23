from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import ProjectDocument
from api.models import User
from project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name']  # Adjust the fields based on your Project model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']  # Adjust the fields based on your User model

# Serializers define the API representation.
class ProjectDocumentSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    uploader = UserSerializer()

    class Meta:
        model = ProjectDocument
        fields = '__all__'
