from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import Payment

class PaymentForm(UserCreationForm):
  class Meta:
    model = Payment
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }