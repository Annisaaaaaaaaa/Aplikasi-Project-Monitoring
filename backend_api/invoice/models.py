from django.db import models
from django.utils.translation import gettext_lazy as _
from project.models import Project
from client.models import Client
from api.models import User
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os
from django.utils import timezone


class StatusChoice(models.TextChoices):
  BELUM = "belum dibayar", _("Belum Dibayar")
  DIBAYAR = "dibayar", _("Dibayar")
  OVERDUE = "overdue", _("Overdue")

class TypeChoice(models.TextChoices):
  BTC = "billing to customer", _("Billing To Customer")
  BFS = "billing from subcon", _("Billing From Subcon")
    

class Invoice(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    to_contact = models.ForeignKey(Client, on_delete=models.CASCADE)
    sent_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    date = models.DateField(default=timezone.now)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=255, choices=StatusChoice.choices, default=StatusChoice.BELUM)
    type = models.CharField(max_length=50, choices=TypeChoice.choices, default=TypeChoice.BTC)  # Pilihan tipe invoice
    no_invoice = models.CharField(max_length=255, null=True)  # Nomor invoice
    name = models.CharField(max_length=255, null=True)  # Nama invoice
    purchase_order = models.CharField(max_length=255, null=True)  # Nomor PO
    note = models.TextField(blank=True, null=True)
    document_file = models.FileField(upload_to='doc/invoice/')
    

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Invoices'
        db_table = 'apm_invoice'

        # Signal to delete file on post_delete
@receiver(post_delete, sender=Invoice)
def delete_invoice_document(sender, instance, **kwargs):
    # Hapus file saat objek Invoice dihapus
    if instance.document_file:
        if os.path.isfile(instance.document_file.path):
            os.remove(instance.document_file.path)