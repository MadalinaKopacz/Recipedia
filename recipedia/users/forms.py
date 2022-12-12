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


class UpdateUserForm(forms.ModelForm):
    username = forms.CharField(max_length=100,
                               required=False,
                               widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(required=False,
                             widget=forms.TextInput(attrs={'class': 'form-control'}))

    first_name = forms.CharField(max_length=100,
                               required=False,
                               widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(max_length=100,
                               required=False,
                               widget=forms.TextInput(attrs={'class': 'form-control'}))

    profile_picture = forms.ImageField(required=False)

    preference_health = forms.JSONField(required=False)

    preference_diet = forms.JSONField(required=False)

    favorites = forms.JSONField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'profile_picture', 'preference_health', 'preference_diet', 'favorites']
