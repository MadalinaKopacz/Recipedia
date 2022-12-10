from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='uploads/')
    preference_health = models.JSONField(blank=True, null=True)
    preference_diet = models.JSONField(blank=True, null=True)
    favorites = models.JSONField(blank=True, null=True)