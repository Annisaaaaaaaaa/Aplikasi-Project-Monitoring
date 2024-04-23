from django.urls import path, include
from .models import Invoice
from client.models import Client
from project.models import Project
from rest_framework import routers, serializers, viewsets



# Serializers define the API representation.
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'
