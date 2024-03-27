from rest_framework import serializers
from .models import Project, EngineerProject

class EngineerProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerProject
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    engineer_projects = EngineerProjectSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'
