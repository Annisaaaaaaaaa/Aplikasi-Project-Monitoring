from rest_framework import serializers
from .models import EngineerWorkload

class WorkloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerWorkload
        fields = ('user', 'tanggung_jawab')
