from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(
        self, username, email, password, first_name, last_name, profile_picture
    ):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            last_name=last_name,
            first_name=first_name,
            username=username,
            profile_picture=profile_picture,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractUser):
    objects = UserManager()

    email = models.EmailField(unique=True)
    profile_picture = models.ImageField(upload_to="uploads/", blank=True)
    preference_health = models.JSONField(blank=True, null=True)
    preference_diet = models.JSONField(blank=True, null=True)
    favorites = models.JSONField(blank=True, null=True)
