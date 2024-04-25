from django.db import models
from project.models import Project
from invoice.models import Invoice

from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver
import os

class TypeChoice(models.TextChoices):
  BTC = "Billing To Customer", _("Billing To Customer")
  BFS = "Billing From Subcon", _("Billing From Subcon")

class Payment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    payment_date = models.DateField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.TextField(blank=True, null=True)
    payer_name = models.CharField(max_length=255)
    payer_account_number = models.CharField(max_length=255)
    receiver_name = models.CharField(max_length=255)
    receiver_account_number = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=TypeChoice.choices, default=TypeChoice.BTC)  # Pilihan tipe invoice
    no_invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, blank=True, null=True)  # Nomor invoice yang terkait
    name = models.CharField(max_length=255, null=True)  # Nama invoice
    document_file = models.FileField(upload_to='doc/payment/', null=True)

    def __str__(self):
        return self.payer_name

    class Meta:
        verbose_name = 'Payments'
        db_table = 'apm_payment'

    # Signal to delete file on post_delete
@receiver(post_delete, sender=Payment)
def delete_payment_document(sender, instance, **kwargs):
    # Hapus file saat objek Invoice dihapus
    if instance.document_file:
        if os.path.isfile(instance.document_file.path):
            os.remove(instance.document_file.path)
