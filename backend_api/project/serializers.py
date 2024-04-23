# from rest_framework import serializers
# from .models import Project, EngineerProject

# class EngineerProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EngineerProject
#         fields = ['engineer', 'presentase_beban_kerja', 'status']
#         read_only_fields = ['project']  # Tambahkan bidang project sebagai read-only

# class ProjectSerializer(serializers.ModelSerializer):
#     engineer_projects = EngineerProjectSerializer(many=True)
    
#     class Meta:
#         model = Project
#         fields = ['id','year', 'pid', 'name', 'description', 'customer',
#             'sales', 'amount_tax', 'amount_exc_tax', 'contract_no', 'contract_date',
#             'am', 'pic', 'pm', 'start_date', 'end_date',
#             'status', 'top', 'sow', 'oos', 'detail',
#             'remarks', 'weight', 'priority', 'type', 'market_segment',
#             'tech_use', 'resiko', 'beban_proyek', 'engineer_projects']
        
#     def create(self, validated_data):
#         engineer_projects_data = validated_data.pop('engineer_projects', [])

#         project_instance = Project.objects.create(**validated_data)

#         for engineer_project_data in engineer_projects_data:
#             EngineerProject.objects.create(project=project_instance, **engineer_project_data)

#         return project_instance

#     def update(self, instance, validated_data):
#         instance.year = validated_data.get('year', instance.year)
#         instance.pid = validated_data.get('pid', instance.pid)
#         instance.name = validated_data.get('name', instance.name)
#         instance.description = validated_data.get('description', instance.description)
#         instance.customer = validated_data.get('customer', instance.customer)
#         instance.sales = validated_data.get('sales', instance.sales)
#         instance.amount_tax = validated_data.get('amount_tax', instance.amount_tax)
#         instance.amount_exc_tax = validated_data.get('amount_exc_tax', instance.amount_exc_tax)
#         instance.contract_no = validated_data.get('contract_no', instance.contract_no)
#         instance.contract_date = validated_data.get('contract_date', instance.contract_date)
#         instance.am = validated_data.get('am', instance.am)
#         instance.pic = validated_data.get('pic', instance.pic)
#         instance.pm = validated_data.get('pm', instance.pm)
#         instance.start_date = validated_data.get('start_date', instance.start_date)
#         instance.end_date = validated_data.get('end_date', instance.end_date)
#         instance.status = validated_data.get('status', instance.status)
#         instance.top = validated_data.get('top', instance.top)
#         instance.sow = validated_data.get('sow', instance.sow)
#         instance.oos = validated_data.get('oos', instance.oos)
#         instance.detail = validated_data.get('detail', instance.detail)
#         instance.remarks = validated_data.get('remarks', instance.remarks)
#         instance.weight = validated_data.get('weight', instance.weight)
#         instance.priority = validated_data.get('priority', instance.priority)
#         instance.type = validated_data.get('type', instance.type)
#         instance.market_segment = validated_data.get('market_segment', instance.market_segment)
#         instance.tech_use = validated_data.get('tech_use', instance.tech_use)
#         instance.resiko = validated_data.get('resiko', instance.resiko)
#         instance.beban_proyek = validated_data.get('beban_proyek', instance.beban_proyek)
                
#         instance.save()

#         # Update or create EngineerProject objects
#         engineer_projects_data = validated_data.pop('engineer_projects', [])
#         for engineer_project_data in engineer_projects_data:
#             engineer_project_id = engineer_project_data.get('id', None)
#             if engineer_project_id:
#                 engineer_project = EngineerProject.objects.get(id=engineer_project_id)
#                 engineer_project.presentase_beban_kerja = engineer_project_data.get('presentase_beban_kerja', engineer_project.presentase_beban_kerja)
#                 engineer_project.status = engineer_project_data.get('status', engineer_project.status)
#                 engineer_project.save()

#         return instance
    
#     def to_representation(self, instance):
#         self.fields['engineer_projects'] = EngineerProjectSerializer(many=True, context=self.context)
#         return super().to_representation(instance)


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
        fields = ['id', 'year', 'pid', 'name', 'description', 'customer', 'sales', 'am', 'pic', 'pm', 'start_date', 'end_date', 'status', 'priority', 'contract_no', 'contract_date', 'sow', 'oos', 'detail', 'remarks', 'type', 'market_segment', 'tech_use', 'resiko', 'beban_proyek', 'engineer_projects']

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
