from django.db import models
from django.utils import timezone
from project.models import Project
from api.models import User
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


class StatusActivities(models.TextChoices):
    Done = "Done", _("Done")
    On_Going = "On Going", _("On Going")
    Waiting = "Waiting", _("Waiting")
    Overdue = "Over Due", _("Over Due")



class EngineerActivity(models.Model):
    activity = models.ForeignKey('AktivitiesProject', on_delete=models.CASCADE, related_name='engineer_activities')
    engineer = models.ForeignKey(User, on_delete=models.CASCADE)
    persentase_beban_kerja = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        unique_together = ('activity', 'engineer')

    def clean(self):
        if self.pk is None:
            # Jika objek belum disimpan, abaikan objek saat ini dalam perhitungan total
            total_presentase = EngineerActivity.objects.filter(activity_id=self.activity_id).aggregate(total=models.Sum('persentase_beban_kerja'))['total'] or 0
        else:
            # Jika objek sudah disimpan, abaikan objek saat ini dan gunakan exclude untuk mengabaikannya dalam perhitungan total
            total_presentase = EngineerActivity.objects.filter(activity_id=self.activity_id).exclude(pk=self.pk).aggregate(total=models.Sum('persentase_beban_kerja'))['total'] or 0
        
        # Jumlahkan presentase beban kerja dari engineer itu sendiri
        total_presentase += self.persentase_beban_kerja or 0

        # Periksa apakah total presentase melebihi 100
        if total_presentase > 100.00:
            raise ValidationError('Total presentase beban kerja melebihi 100%.')


    def __str__(self):
        return f"{self.engineer} - {self.activity}"





class AktivitiesProject(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    pm = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    date_start = models.DateTimeField(blank=True, null=True)
    date_finish = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date_estimated = models.DateTimeField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=StatusActivities.choices)

    tanggung_jawab = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Tambahkan field engineers
    engineers = models.ManyToManyField(User, through='EngineerActivity', related_name='activities')

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
    def nama_engineers(self):
        return ", ".join([engineer.engineer.name for engineer in self.engineer_activities.all()])
    

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Aktivities Project'
        db_table = 'apm_aktivitiesProject'
        ordering = ['-created_at']
        indexes = [models.Index(fields=['-created_at']), ]
