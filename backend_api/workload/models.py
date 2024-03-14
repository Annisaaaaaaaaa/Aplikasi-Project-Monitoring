from django.db import models
from django.utils import timezone
from api.models import Profile
from project.models import Project
from aktivitas_project.models import AktivitiesProject

class Workload(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    default_allocation = models.FloatField(default=0)
    project_contribution = models.FloatField(default=0)
    activity_contribution = models.FloatField(default=0)
    total_workload = models.FloatField(default=0)

    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def calculate_project_contribution(self):
        # Mengambil total beban kerja dari projek yang melibatkan user ini
        total_project_contribution = Project.objects.filter(engineers=self.user).aggregate(total=models.Sum('beban_proyek'))['total'] or 0
        return total_project_contribution

    def calculate_activity_contribution(self):
        # Mengambil total beban kerja dari aktivitas projek yang melibatkan user ini
        total_activity_contribution = AktivitiesProject.objects.filter(engineers=self.user).aggregate(total=models.Sum('tanggung_jawab'))['total'] or 0
        return total_activity_contribution

    def calculate_workload_percentage(self):
        total_allocated = self.default_allocation + self.project_contribution + self.activity_contribution
        if total_allocated <= 0:
            return 0
        return (self.default_allocation / total_allocated) * 100

    def save(self, *args, **kwargs):
        # Hitung total workload dari projek dan aktivitas projek
        self.project_contribution = self.calculate_project_contribution()
        self.activity_contribution = self.calculate_activity_contribution()
        self.total_workload = self.default_allocation + self.project_contribution + self.activity_contribution
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Workload'
        db_table = 'apm_workload'
        ordering = ['-created_at']
        indexes = [models.Index(fields=['-created_at']), ]
