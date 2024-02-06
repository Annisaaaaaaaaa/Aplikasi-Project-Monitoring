from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import ProjectDocument

# Serializers define the API representation.
class ProjectDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDocument
        fields = '__all__'

