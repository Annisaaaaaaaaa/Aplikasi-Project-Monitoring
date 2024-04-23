from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from .models import Payment

# Serializers define the API representation.
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        extra_kwargs = {
            'document_file': {'required': False}  
        }
