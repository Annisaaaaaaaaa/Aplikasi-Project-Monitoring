from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import Client

class ClientForm(UserCreationForm):
  class Meta:
    model = Client
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }