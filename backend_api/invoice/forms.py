from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import Invoice

class InvoiceForm(UserCreationForm):
  class Meta:
    model = Invoice
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }