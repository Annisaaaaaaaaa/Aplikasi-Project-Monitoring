from django.db import models
from project.models import Project

class Payment(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    payment_date = models.DateTimeField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.TextField(blank=True, null=True)
    payer_name = models.CharField(max_length=255)
    payer_account_number = models.CharField(max_length=255)
    receiver_name = models.CharField(max_length=255)
    receiver_account_number = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Payments'
        db_table = 'apm_payment'
