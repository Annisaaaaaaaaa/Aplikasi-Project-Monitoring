from django.db import models
from django.utils import timezone
from api.models import User
from decimal import Decimal
from django.db.models.signals import post_save
from django.dispatch import receiver
from project.models import EngineerProject
from aktivitas_project.models import EngineerActivity
from project.models import EngineerProject



class Workload(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    default_allocation = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    project_contribution = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable=False)
    activity_contribution = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable=False)
    total_workload = models.DecimalField(max_digits=10, decimal_places=2, default=0, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        # Clear project_contribution, activity_contribution, and total_workload
        self.project_contribution = Decimal('0')
        self.activity_contribution = Decimal('0')
        self.total_workload = Decimal('0')


    def calculate_project_contribution(self):
        # Ambil proyek yang diikuti oleh pengguna
        engineer_projects = EngineerProject.objects.filter(engineer=self.user)
        project_contribution = Decimal('0')
        for engineer_project in engineer_projects:
            # Ambil proyek yang terkait dengan engineer_project
            project = engineer_project.project
            # Ambil status proyek dari model Project
            status = project.status
            # Jika statusnya On Going, Overdue, atau Waiting, tambahkan kontribusi proyek
            if status in ['On Going', 'Overdue', 'Waiting']:
                if engineer_project.presentase_beban_kerja is not None and project.beban_proyek is not None:
                    percentage = Decimal(str(engineer_project.presentase_beban_kerja))
                    project_contribution += (percentage / Decimal('100')) * project.beban_proyek
        return project_contribution
    

    #ini yang bener
    def calculate_activity_contribution(self):
        # Ambil aktivitas yang mana user tersebut berpartisipasi
        engineer_activities = EngineerActivity.objects.filter(engineer=self.user)
        activity_contribution = Decimal('0')
        for engineer_activity in engineer_activities:
            # Ambil aktivitas projek yang statusnya On Going, Overdue, atau Waiting
            project = engineer_activity.activity
            if project.status in ['On Going', 'Overdue', 'Waiting']:
                if engineer_activity.persentase_beban_kerja is not None and project.tanggung_jawab is not None:
                    activity_contribution += (engineer_activity.persentase_beban_kerja / Decimal('100')) * project.tanggung_jawab
        return activity_contribution


    #ini nyobain
    # def calculate_activity_contribution(self):
    #     # Inisialisasi total kontribusi aktivitas
    #     activity_contribution = Decimal('0')
        
    #     # Hitung kontribusi berdasarkan aktivitas yang berhubungan dengan proyek yang diikuti oleh pengguna
    #     project_related_activities = self.calculate_activity_contribution_project_related()
    #     activity_contribution += project_related_activities
        
    #     # Hitung kontribusi berdasarkan aktivitas yang langsung berhubungan dengan pengguna
    #     user_related_activities = self.calculate_activity_contribution_user_related()
    #     activity_contribution += user_related_activities
        
    #     return activity_contribution



    # def calculate_activity_contribution_project_related(self):
    #     # Ambil proyek yang diikuti oleh pengguna
    #     engineer_projects = EngineerProject.objects.filter(engineer=self.user)
    #     project_related_activity_contribution = Decimal('0')
        
    #     for engineer_project in engineer_projects:
    #         # Ambil aktivitas projek yang terkait dengan proyek yang diikuti oleh pengguna
    #         engineer_activities = EngineerActivity.objects.filter(activity__project=engineer_project.project)
            
    #         for engineer_activity in engineer_activities:
    #             # Ambil aktivitas projek yang statusnya On Going, Overdue, atau Waiting
    #             if engineer_activity.activity.status in ['On Going', 'Overdue', 'Waiting']:
    #                 if engineer_activity.persentase_beban_kerja is not None and engineer_activity.activity.tanggung_jawab is not None:
    #                     project_related_activity_contribution += (engineer_activity.persentase_beban_kerja / Decimal('100')) * engineer_activity.activity.tanggung_jawab
        
    #     return project_related_activity_contribution

    # def calculate_activity_contribution_user_related(self):
    #     # Ambil aktivitas yang langsung berhubungan dengan pengguna
    #     engineer_activities = EngineerActivity.objects.filter(engineer=self.user)
    #     user_related_activity_contribution = Decimal('0')
        
    #     for engineer_activity in engineer_activities:
    #         # Ambil aktivitas projek yang statusnya On Going, Overdue, atau Waiting
    #         if engineer_activity.activity.status in ['On Going', 'Overdue', 'Waiting']:
    #             if engineer_activity.persentase_beban_kerja is not None and engineer_activity.activity.tanggung_jawab is not None:
    #                 user_related_activity_contribution += (engineer_activity.persentase_beban_kerja / Decimal('100')) * engineer_activity.activity.tanggung_jawab
        
    #     return user_related_activity_contribution


    
    #ini yang bener
    def calculate_workload_percentage(self):
        if self.default_allocation == 0:
            return "Tidak ada alokasi"
        total_allocated = self.project_contribution + self.activity_contribution
        return "{:.2f}%".format((total_allocated / self.default_allocation) * 100)


    #ini nyobain
    def calculate_workload_percentage(self):
        # Jika tidak ada alokasi default, kembalikan pesan yang sesuai
        if self.default_allocation == 0:
            return "Tidak ada alokasi"

        # Hitung total kontribusi dari proyek dan aktivitas
        total_contribution = self.project_contribution + self.activity_contribution

        # Hitung presentase workload berdasarkan kontribusi dan alokasi default
        workload_percentage = (total_contribution / self.default_allocation) * 100

        return "{:.2f}%".format(workload_percentage)



    def update_workload(sender, instance, created, **kwargs):
        # Hitung kontribusi proyek dan aktivitas
        instance.project_contribution = instance.calculate_project_contribution()
        instance.activity_contribution = instance.calculate_activity_contribution()

        # Pastikan nilai project_contribution dan activity_contribution tidak None
        if instance.project_contribution is None:
            instance.project_contribution = Decimal('0')
        if instance.activity_contribution is None:
            instance.activity_contribution = Decimal('0')

        # Hitung total workload
        instance.total_workload = instance.project_contribution + instance.activity_contribution
        instance.save()