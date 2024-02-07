from django.utils import timezone
from django.db import models
from project.models import Project
from api.models import Profile
from django.utils.translation import gettext_lazy as _


class StatusActivities(models.TextChoices):
    Done = "Done", _("Done")
    On_Going = "On Going", _("On Going")
    Waiting = "Waiting", _("Waiting")
    Overdue = "Over Due", _("Over Due")

class AktivitiesProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    pm = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='pm_projects')
    name = models.CharField(max_length=255)
    date_start = models.DateTimeField()
    date_finish = models.DateTimeField()
    description = models.TextField()
    date_estimated = models.DateTimeField()  # Perbaikan pada nama field
    note = models.TextField()
    status = models.CharField(max_length=20, choices=StatusActivities.choices)
    backend = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='backend')
    pic = models.CharField(max_length=255)

    # Default
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def nama_pm(self):
        return self.pm.name

    @property
    def nama_project(self):
        return self.project.name

    @property
    def nama_engineer(self):
        return self.backend.name 

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Aktivities Project'
        db_table = 'apm_aktivitiesProject'
        ordering = ['-created_at']
        indexes = [ models.Index(fields=['-created_at']), ]
