from rest_framework import serializers
from .models import Project, EngineerProject
from api.serializer import UserSerializer

class EngineerProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerProject
        fields = ['engineer', 'presentase_beban_kerja', 'status']

class ProjectSerializer(serializers.ModelSerializer):
    engineer_projects = EngineerProjectSerializer(many=True)

    class Meta:
        model = Project
        fields = ['id', 'year', 'pid', 'name', 'description', 'customer', 'sales', 'am', 'pic', 'pm', 'start_date', 'end_date', 'status', 'priority', 'contract_no', 'contract_date', 'sow', 'oos', 'detail', 'remarks', 'type', 'market_segment', 'tech_use', 'resiko', 'beban_proyek', 'completion_percentage', 'engineer_projects']

    def create(self, validated_data):
        engineer_projects_data = validated_data.pop('engineer_projects')
        project = Project.objects.create(**validated_data)

        for engineer_project_data in engineer_projects_data:
            EngineerProject.objects.create(project=project, **engineer_project_data)

        return project

    def update(self, instance, validated_data):
        engineer_projects_data = validated_data.pop('engineer_projects', [])
        instance = super().update(instance, validated_data)

        for engineer_project_data in engineer_projects_data:
            engineer_project_id = engineer_project_data.get('id')
            engineer_id = engineer_project_data.get('engineer')
            presentase_beban_kerja = engineer_project_data.get('presentase_beban_kerja')
            status = engineer_project_data.get('status')

            # Coba untuk mendapatkan entri EngineerProject yang sudah ada dalam database
            engineer_project_instance = EngineerProject.objects.filter(project=instance, engineer_id=engineer_id).first()

            if engineer_project_instance:
                # Jika entri sudah ada, perbarui entri tersebut
                engineer_project_instance.presentase_beban_kerja = presentase_beban_kerja
                engineer_project_instance.status = status
                engineer_project_instance.save()
            else:
                # Jika entri belum ada, buat entri baru
                EngineerProject.objects.create(project=instance, **engineer_project_data)

        return instance
