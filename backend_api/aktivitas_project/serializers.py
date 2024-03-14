# serializers.py

from rest_framework import serializers
from .models import AktivitiesProject

class AktivitasSerializer(serializers.ModelSerializer):
    class Meta:
        model = AktivitiesProject
        fields = '__all__'
