# nama_app/models.py

from django.db import models
from client.models import Client  
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from api.models import User

class PriorityChoise(models.TextChoices):
  TINGGI = "tinggi", _("Tinggi")
  SEDANG = "sedang", _("Sedang")
  RENDAH = "rendah", _("Rendah")

class Project(models.Model):
    # Sales
    year = models.IntegerField()
    pid = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    customer = models.ForeignKey(Client, on_delete=models.CASCADE)
    sales = models.ForeignKey(User, on_delete=models.CASCADE)
    amount_tax = models.IntegerField(blank=True, null=True)
    amount_exc_tax = models.IntegerField(blank=True, null=True)

    # Admin
    contract_no = models.CharField(max_length=255, blank=True, null=True)
    contract_date = models.DateField(blank=True, null=True)
    am = models.ForeignKey(User, on_delete=models.CASCADE, related_name='am_project', blank=True, null=True)
    pic = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pic_projects', blank=True, null=True)
    pm = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pm_projects', blank=True, null=True)

    # PM
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    top = models.CharField(max_length=255, blank=True, null=True)
    sow = models.CharField(max_length=255, blank=True, null=True)
    oos = models.CharField(max_length=255, blank=True, null=True)
    detail = models.CharField(max_length=255, blank=True, null=True)
    remarks = models.CharField(max_length=255, blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    priority = models.CharField(max_length=10, choices=PriorityChoise.choices, default=PriorityChoise.SEDANG)
    type = models.CharField(max_length=255, blank=True, null=True)
    market_segment = models.CharField(max_length=255, blank=True, null=True)
    tech_use = models.TextField(blank=True, null=True)
    resiko = models.CharField(max_length=255, blank=True, null=True)

    beban_proyek = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    completion_percentage = models.IntegerField(blank=True, null=True)

    # Default
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Project'
        db_table = 'apm_project'
        ordering = ['-created_at']
        indexes = [ models.Index(fields=['-created_at']), ]



class EngineerProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='engineers')
    engineer = models.ForeignKey(User, on_delete=models.CASCADE)
    presentase_beban_kerja = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        unique_together = ('project', 'engineer')
