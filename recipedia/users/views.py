
from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from .forms import UserCreateForm, LoginForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, authenticate, login

 
def create_user_view(request):
    context = {}
    form = UserCreateForm(request.POST or None, request.FILES or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            return HttpResponse("Succes")

    if form.is_valid():
        form.save()
    
    context['form'] = form
    return render(request, "users/create_user.html", context)

def login_view(request):
    if not request.user.is_anonymous: # Somebody already connected tries to access
        return HttpResponse("Already logged in")

    context = {}
    form = LoginForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            user = authenticate(username=form.cleaned_data.get('username'), 
                                password=form.cleaned_data.get('password'))
            if user is not None:
                login(request=request, user=user)
                return HttpResponse("Logged in.")
            else:
                return HttpResponse("Login failed.")

    
    context['form'] = form
    return render(request, "users/login.html", context)


@login_required
def logout_view(request):
    logout(request)
    # Redirect to a success page.
    return HttpResponse("Logged out.")
