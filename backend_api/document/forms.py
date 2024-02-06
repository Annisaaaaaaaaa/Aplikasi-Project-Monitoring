from django import forms
from django.contrib.auth.forms import UserCreationForm

from .models import ProjectDocument

class ProjectDocumentForm(UserCreationForm):
  class Meta:
    model = ProjectDocument
    fields = '__all__'
    # widgets = {
    #   'password': forms.PasswordInput(),  # Menggunakan PasswordInput untuk bidang password
    # }