from django.db import models
from django.utils import timezone
from project.models import Project
from api.models import User
from django.utils.translation import gettext_lazy as _


class StatusActivities(models.TextChoices):
    Done = "Done", _("Done")
    On_Going = "On Going", _("On Going")
    Waiting = "Waiting", _("Waiting")
    Overdue = "Over Due", _("Over Due")
    Not_Started_Yet = "Not Started Yet", _("Not Started Yet")
    Incompleted = "Incompleted", _("Incompleted")
    Chaotic = "Chaotic", _("Chaotic")  # Sekarang ada status Chaos! 😄


class EngineerActivity(models.Model):
    activity = models.ForeignKey('AktivitiesProject', on_delete=models.CASCADE, related_name='engineer_activities')
    engineer = models.ForeignKey(User, on_delete=models.CASCADE)
    persentase_beban_kerja = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=StatusActivities.choices, default=StatusActivities.Not_Started_Yet)


class StakeholderActivity(models.Model):
    activity = models.ForeignKey('AktivitiesProject', on_delete=models.CASCADE, related_name='stakeholder_activities')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stakeholder = models.CharField(max_length=100, blank=True, null=True)


class AktivitiesProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    pm = models.ForeignKey(User, on_delete=models.CASCADE, related_name='aktivitas_projects', default=False)  # Change related_name here
    name = models.CharField(max_length=255)
    date_start = models.DateTimeField(blank=True, null=True)
    date_finish = models.DateTimeField(blank=True, null=True)
    date_estimated = models.DateTimeField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=StatusActivities.choices, default=StatusActivities.Chaotic)
    tanggung_jawab = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    engineers = models.ManyToManyField(User, through='EngineerActivity', related_name='engineer_activities')
    stakeholders = models.ManyToManyField(User, through='StakeholderActivity', related_name='stakeholder_activities')

    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Aktivities Project'
        db_table = 'apm_aktivitiesProject'
        ordering = ['-created_at']
        indexes = [models.Index(fields=['-created_at']), ]
