from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)  # Set default to True

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def profile(self):
        profile = Profile.objects.get(user=self)
        self.is_staff()
        self.is_superuser = True
        self.save()

    class Meta:
        db_table = 'api_profile2'


# Role Choices
class UserRoleChoice(models.TextChoices):
    PM = "PM", _("Project Manager")
    SALES = "SALES", _("Sales")
    ENGINEER = "ENGINEER", _("Engineer")
    ADMIN = "ADMIN", _("Admin Tender")

class UserGenderChoice(models.TextChoices):
    MALE = "M", _("Male")
    FEMALE = "F", _("Female")

class UserStatusChoice(models.TextChoices):
    INTERNAL = "internal", _("Internal")
    EXTERNAL = "external", _("External")


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)
    role = models.CharField(max_length=20, choices=UserRoleChoice.choices, default=True)
    status = models.CharField(blank=True, max_length=10, 
                                choices=UserStatusChoice.choices, default=UserStatusChoice.INTERNAL)

    phone = models.CharField(max_length=20, blank=True)
    
    # technical_skill 
    photo = models.ImageField(blank=True) 

    address = models.TextField(blank=True)

    # short_bio text
    gender = models.CharField(max_length=1, choices=UserGenderChoice.choices, null=True)
    department = models.CharField(max_length=50,  blank=True) # IT
    position = models.CharField(max_length=50, blank=True) # Engineer
    titles = models.CharField(max_length=50, blank=True) # Frontend

    # Default
    created_at = models.DateTimeField(db_index=True, default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)
