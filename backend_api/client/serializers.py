from django.urls import path, include
from .models import Client
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

