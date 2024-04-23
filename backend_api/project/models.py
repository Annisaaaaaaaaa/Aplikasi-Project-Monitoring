from django.db import models
from django.core.exceptions import ValidationError
from api.models import User
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from decimal import Decimal
from client.models import Client

class PriorityChoice(models.TextChoices):
    TINGGI = "tinggi", _("Tinggi")
    SEDANG = "sedang", _("Sedang")
    RENDAH = "rendah", _("Rendah")

class StatusProject(models.TextChoices):
    ON_GOING = "On Going", _("On Going")
    OVERDUE = "Overdue", _("Overdue")
    WAITING = "Waiting", _("Waiting")
    DONE = "Done", _("Done")

class Project(models.Model):

    year = models.IntegerField()
    pid = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    customer = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)
    sales = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    amount_tax = models.IntegerField(blank=True, null=True)
    amount_exc_tax = models.IntegerField(blank=True, null=True)
    top = models.CharField(max_length=255, blank=True, null=True)


    am = models.ForeignKey(User, on_delete=models.CASCADE, related_name='am_projects', blank=True, null=True)
    pic = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pic_projects', blank=True, null=True)
    pm = models.ForeignKey(User, on_delete=models.CASCADE, related_name='project_pm', default=False, blank=True, null=True)  # Change related_name here
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=StatusProject.choices, default=StatusProject.ON_GOING)
    priority = models.CharField(max_length=10, choices=PriorityChoice.choices, default=PriorityChoice.SEDANG, blank=True, null=True)
    contract_no = models.CharField(max_length=255, blank=True, null=True)
    contract_date = models.DateField(blank=True, null=True)

    sow = models.CharField(max_length=255, blank=True, null=True)
    oos = models.CharField(max_length=255, blank=True, null=True)
    detail = models.CharField(max_length=255, blank=True, null=True)
    remarks = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    market_segment = models.CharField(max_length=255, blank=True, null=True)
    tech_use = models.TextField(blank=True, null=True)
    resiko = models.CharField(max_length=255, blank=True, null=True)
    beban_proyek = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    completion_percentage = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    engineers = models.ManyToManyField(User, through='EngineerProject', related_name='project_engagements')

    # completion_percentage = models.IntegerField(blank=True, null=True)  

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Project'
        db_table = 'apm_project'
        ordering = ['-created_at']


class EngineerProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='engineer_projects')
    engineer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='engineer_engagements')  
    presentase_beban_kerja = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=StatusProject.choices, default=StatusProject.ON_GOING)

    class Meta:
        unique_together = ('project', 'engineer')

    def clean(self):
        # Hitung total presentase beban kerja untuk proyek ini
        total_presentase = EngineerProject.objects.filter(project_id=self.project_id).exclude(pk=self.pk).aggregate(total=models.Sum('presentase_beban_kerja'))['total'] or 0
        
        # Ambil nilai presentase beban kerja atau atur nilai default menjadi 0 jika None
        presentase_beban_kerja = self.presentase_beban_kerja if self.presentase_beban_kerja is not None else 0

        # Jumlahkan presentase beban kerja dari engineer itu sendiri
        total_presentase += presentase_beban_kerja

        # Jika total presentase melebihi 100 setelah mengurangkan presentase engineer tersebut, maka akan validasi erorrr
        if total_presentase > 100.00:
            raise ValidationError('Total presentase beban kerja melebihi 100%')


    def __str__(self):
        return f"{self.engineer} - {self.project}"
    
