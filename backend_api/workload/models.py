from django.db import models
from django.utils import timezone
from api.models import User
from decimal import Decimal
from django.db.models.signals import post_save
from django.dispatch import receiver
from project.models import Project, EngineerProject
from aktivitas_project.models import AktivitiesProject, EngineerActivity
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

    
    
    

    def calculate_workload_percentage(self):
        if self.default_allocation == 0:
            return "Tidak ada alokasi"
        total_allocated = self.project_contribution + self.activity_contribution
        return "{:.2f}%".format((total_allocated / self.default_allocation) * 100)



    @receiver(post_save, sender=Project)
    def update_workload_on_project_change(sender, instance, **kwargs):
        # Perbarui beban kerja setiap kali ada perubahan pada proyek
        engineer_projects = EngineerProject.objects.filter(project=instance)
        for engineer_project in engineer_projects:
            workload, created = Workload.objects.get_or_create(user=engineer_project.engineer)
            workload.save()  # Memicu perhitungan ulang total workload

    def save(self, *args, **kwargs):
        # Hitung kontribusi proyek dan aktivitas sebelum menyimpan
        self.project_contribution = self.calculate_project_contribution()
        self.activity_contribution = self.calculate_activity_contribution()

        # Pastikan nilai project_contribution dan activity_contribution tidak None
        if self.project_contribution is None:
            self.project_contribution = Decimal('0')
        if self.activity_contribution is None:
            self.activity_contribution = Decimal('0')

        # Hitung total workload
        self.total_workload = self.project_contribution + self.activity_contribution
        super().save(*args, **kwargs)