from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import AktivitiesProject

class ClientForm(UserCreationForm):
  class Meta:
    model = AktivitiesProject
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }