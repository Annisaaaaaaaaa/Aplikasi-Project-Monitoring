from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class StatusChoice(models.TextChoices):
  AKTIVE = "aktif", _("Aktif")
  INACTIVE = "tidak aktif", _("TIdak Aktif")

class SizeCompany(models.TextChoices):
  BESAR = "besar", _("Besar")
  SEDANG = "sedang", _("Sedang")
  KECIL = "kecil", _("Kecil")

class Client(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    pic_phone = models.CharField(max_length=20)
    pic_email = models.EmailField()
    pic_title = models.CharField(max_length=255)

    # Optional Fields
    industry = models.CharField(max_length=255, blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to='client_logos/', blank=True, null=True)
    company_size = models.CharField(max_length=255, choices=SizeCompany.choices, default=SizeCompany.SEDANG)
    company_address = models.CharField(max_length=255, blank=True, null=True)
    contact_person_name = models.CharField(max_length=255, blank=True, null=True)
    company_email = models.EmailField(blank=True, null=True)
    company_phone = models.CharField(max_length=20, blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)

    date_joined = models.DateField()
    
    status = models.CharField(max_length=20, choices=StatusChoice, default=StatusChoice.AKTIVE)
    last_activity = models.DateTimeField()

    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'client'
        db_table = 'apm_client'
        ordering = ['-created_at']
        indexes = [ models.Index(fields=['-created_at']), ]
