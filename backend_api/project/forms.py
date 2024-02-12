from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import Project

class ProjectForm(UserCreationForm):
  class Meta:
    model = Project
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }