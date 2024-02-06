from django.db import models
from django.utils.translation import gettext_lazy as _
from project.models import Project
from client.models import Client

class StatusChoice(models.TextChoices):
  BELUM = "belum dibayar", _("Belum Dibayar")
  DIBAYAR = "dibayar", _("Dibayar")
  OVERDUE = "overdue", _("Overdue")
    
class Invoice(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    to_contact = models.ForeignKey(Client, on_delete=models.CASCADE)
    sent_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=255, choices=StatusChoice.choices, default=StatusChoice.BELUM)
    note = models.TextField(blank=True, null=True)
    document_file = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Invoices'
        db_table = 'apm_invoice'