from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from users.models import User

from .forms import UserCreateForm


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


@login_required
def get_user_details(request):
    context = {}
    context["data"] = request.user

    return render(request, 'users/user_profile.html', context)

    