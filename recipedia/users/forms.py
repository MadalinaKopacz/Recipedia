from multiprocessing import AuthenticationError
from django import forms
from django.shortcuts import get_object_or_404
from .models import User
from django.contrib.auth.forms import UserCreationForm


class UserCreateForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ['username', 'email', 'profile_picture',
                   'password1', 'password2']


class LoginForm(forms.Form):
    username = forms.CharField(
        label='',
        widget=forms.TextInput(
            attrs = {
                'placeholder': 'username or email',
            }
        )
    )

    password = forms.CharField(
        label='', 
        widget=forms.PasswordInput(
            attrs = {
                'placeholder': 'password'
            }
        )
    )