from django.urls import path, include
from .models import Client
from rest_framework import routers, serializers, viewsets

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        extra_kwargs = {
            'logo': {'required': False}  # Mengizinkan logo menjadi opsional
        }

