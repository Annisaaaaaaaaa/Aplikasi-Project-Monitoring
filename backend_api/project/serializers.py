from django.urls import path, include
from .models import Project
from rest_framework import routers, serializers, viewsets
from api.models import User
from client.models import Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']  # Adjust the fields based on your User model

# Serializers define the API representation.
class ProjectSerializer(serializers.ModelSerializer):
    customer = ClientSerializer()
    am = UserSerializer()
    pic = UserSerializer()
    pm = UserSerializer()
    sales = UserSerializer()

    class Meta:
        model = Project
        fields = '__all__'

