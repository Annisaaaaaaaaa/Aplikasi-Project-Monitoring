from django.db import models
from api.models import Profile
from project.models import Project
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class EngineerWorkload(models.Model):
    id = models.AutoField(primary_key=True)
    engineer = models.ForeignKey(Profile, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    default_allocation = models.FloatField(default=100)    
    percent_allocation = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(200)]
    )    

    # Default
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def engineer_name(self):
        return self.engineer.get_name() if self.engineer.get_name() else self.engineer.name

    def __str__(self):
        return f"{self.engineer_name()} - {self.project}"

    class Meta:
        verbose_name = "Engineer's Worklod"
        db_table = 'apm_workload'
        ordering = ['-created_at']
        indexes = [ models.Index(fields=['-created_at']), ]
