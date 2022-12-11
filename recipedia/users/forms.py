from multiprocessing import AuthenticationError
from django import forms
from django.shortcuts import get_object_or_404
from .models import User
from django.contrib.auth.forms import UserCreationForm


class UserCreateForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'profile_picture',
                   'password1', 'password2']
