from rest_framework import serializers
from .models import AktivitiesProject, EngineerActivity, StakeholderActivity
from project.models import Project
from api.models import User

class EngineerActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerActivity
        fields = ['engineer', 'persentase_beban_kerja', 'status']


class StakeholderActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = StakeholderActivity
        fields = ['user', 'stakeholder']


class AktivitiesProjectSerializer(serializers.ModelSerializer):
    engineer_activities = EngineerActivitySerializer(many=True)
    stakeholder_activities = StakeholderActivitySerializer(many=True)

    class Meta:
        model = AktivitiesProject
        fields = ['id', 'project', 'pm', 'name', 'date_start', 'date_finish', 'date_estimated',
                  'note', 'status', 'tanggung_jawab', 'engineer_activities', 'stakeholder_activities']

    def create(self, validated_data):
        engineer_activities_data = validated_data.pop('engineer_activities')
        stakeholder_activities_data = validated_data.pop('stakeholder_activities')

        project = validated_data.pop('project')
        pm = validated_data.pop('pm')

        aktivitas_project = AktivitiesProject.objects.create(project=project, pm=pm, **validated_data)

        for engineer_activity_data in engineer_activities_data:
            EngineerActivity.objects.create(activity=aktivitas_project, **engineer_activity_data)

        for stakeholder_activity_data in stakeholder_activities_data:
            StakeholderActivity.objects.create(activity=aktivitas_project, **stakeholder_activity_data)

        return aktivitas_project
    

    def update(self, instance, validated_data):
        # Update fields of AktivitiesProject instance
        instance.name = validated_data.get('name', instance.name)
        instance.date_start = validated_data.get('date_start', instance.date_start)
        instance.date_finish = validated_data.get('date_finish', instance.date_finish)
        instance.date_estimated = validated_data.get('date_estimated', instance.date_estimated)
        instance.note = validated_data.get('note', instance.note)
        instance.status = validated_data.get('status', instance.status)
        instance.tanggung_jawab = validated_data.get('tanggung_jawab', instance.tanggung_jawab)

        # Update engineer_activities
        engineer_activities_data = validated_data.get('engineer_activities', [])
        for engineer_activity_data in engineer_activities_data:
            engineer_id = engineer_activity_data.get('engineer')
            persentase_beban_kerja = engineer_activity_data.get('persentase_beban_kerja')
            status = engineer_activity_data.get('status')

            engineer_activity, created = EngineerActivity.objects.get_or_create(activity=instance, engineer_id=engineer_id)
            engineer_activity.persentase_beban_kerja = persentase_beban_kerja
            engineer_activity.status = status
            engineer_activity.save()

        # Update stakeholder_activities
        stakeholder_activities_data = validated_data.get('stakeholder_activities', [])
        for stakeholder_activity_data in stakeholder_activities_data:
            user_id = stakeholder_activity_data.get('user')
            stakeholder = stakeholder_activity_data.get('stakeholder')

            stakeholder_activity, created = StakeholderActivity.objects.get_or_create(activity=instance, user_id=user_id)
            stakeholder_activity.stakeholder = stakeholder
            stakeholder_activity.save()

        instance.save()
        return instance


# Delete
class ActivityDeleteSerializer(serializers.ModelSerializer):
    stakeholder = StakeholderActivitySerializer()
    engineer = EngineerActivitySerializer()

    class Meta:
        model = User
        fields = '__all__'

    def delete(self, instance):
        # Hapus profil terkait dengan pengguna yang dihapus
        instance.engineer.delete()
        instance.stakeholder.delete()
        # Hapus pengguna
        instance.delete()