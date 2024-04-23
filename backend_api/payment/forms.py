from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import Payment
from invoice.models import Invoice

class PaymentForm(UserCreationForm):
  class Meta:
    model = Payment
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }
    def __init__(self, *args, **kwargs):
      super().__init__(*args, **kwargs)
      # Mendapatkan nomor invoice yang belum dibayar
      invoices = Invoice.objects.values_list('no_invoice', flat=True)
      # Mengambil nomor invoice sebagai pilihan
      invoice_choices = [(invoice.id, invoice.no_invoice) for invoice in invoices]
      # Menetapkan pilihan nomor invoice ke field no_invoice
      self.fields['no_invoice'].choices = invoice_choices