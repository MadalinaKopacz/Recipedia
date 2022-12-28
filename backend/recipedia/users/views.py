import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .forms import UserCreateForm, LoginForm, UpdateUserForm
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, authenticate, login, update_session_auth_hash
from django.shortcuts import get_object_or_404
from django.core import serializers
from users.models import User
from .forms import UserCreateForm
from django.http import JsonResponse
import secrets
from tokens.models import Token
from datetime import timedelta
from django.utils import timezone
from .decorators import custom_login_required


def create_user_view(request):
    context = {}
    form = UserCreateForm(request.POST or None, request.FILES or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            return HttpResponse("Succes")

    if form.is_valid():
        form.save()

    context["form"] = form
    return render(request, "users/create_user.html", context)


def create_user(request):
    if not request.user.is_anonymous:  # Somebody already connected tries to access
        return JsonResponse(
            {
                "status": "failed",
                "message": "User is logged in.",
            },
            status=400,
        )

    if request.method == "POST":
        data = json.loads(request.body)
        first_name = data.get("firstname")
        last_name = data.get("lastname")
        username = data.get("username")
        email = data.get("email")
        password1 = data.get("password1")
        password2 = data.get("password2")
        profile_pic = data.get("profilepic")

        if password1 != password2:
            return JsonResponse(
                {
                    "status": "failed",
                    "message": "Passwords don't match",
                },
                status=400,
            )

        if (
            User.objects.filter(username=username).exists()
            or User.objects.filter(email=email).exists()
        ):
            return JsonResponse(
                {
                    "status": "failed",
                    "message": "Failed to create account.",
                },
                status=400,
            )

        user = User.objects.create_user(
            username, email, password1, first_name, last_name, profile_pic
        )

        if user is not None:
            login(request=request, user=user)
            token = Token.objects.create(
                value=secrets.token_hex(32),
                user=user,
                expired_at=timezone.now() + timedelta(days=7),
            )
            return JsonResponse({"status": "success", "token": token.value})
        else:
            return JsonResponse(
                {
                    "status": "failed",
                    "message": "Failed to create account.",
                },
                status=400,
            )
    return JsonResponse(
        {
            "status": "failed",
            "message": "Invalid request method",
        },
        status=400,
    )


def loginView(request):
    if not request.user.is_anonymous:  # Somebody already connected tries to access
        return JsonResponse(
            {
                "status": "failed",
                "message": "User is logged in.",
            },
            status=400,
        )

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request=request, user=user)
            token = Token.objects.create(
                value=secrets.token_hex(32),
                user=user,
                expired_at=timezone.now() + timedelta(days=7),
            )
            return JsonResponse({"status": "success", "token": token.value})
        else:
            return JsonResponse(
                {
                    "status": "failed",
                    "message": "Login failed.",
                },
                status=400,
            )
    return JsonResponse(
        {
            "status": "failed",
            "message": "User is logged in.",
        },
        status=400,
    )


def login_view(request):
    if not request.user.is_anonymous:  # Somebody already connected tries to access
        return JsonResponse({"status": "failed", "message": "Already logged in."})

    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request=request, user=user)
            token = Token.objects.create(
                value=secrets.token_hex(32),
                user=user,
                expired_at=timezone.now() + timedelta(days=7),
            )
            return JsonResponse({"status": "success", "token": token.value})
        else:
            return JsonResponse(
                {
                    "status": "failed",
                    "message": "Invalid credentials",
                },
                status=400,
            )
    return JsonResponse(
        {
            "status": "failed",
            "message": "Invalid request method",
        },
        status=400,
    )


def login_view_template(request):
    if not request.user.is_anonymous:  # Somebody already connected tries to access
        return HttpResponse("Already logged in")

    context = {}
    form = LoginForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data.get("username"),
                password=form.cleaned_data.get("password"),
            )
            if user is not None:
                login(request=request, user=user)
                return HttpResponse("Logged in.")
            else:
                return HttpResponse("Login failed.")

    context["form"] = form
    return render(request, "users/login.html", context)


@custom_login_required
def get_user_details(request):
    context = {}
    user = serializers.serialize("json", [request.user])
    context["user"] = user
    # print(user)
    return JsonResponse(context)


@custom_login_required
def delete_user(request):
    context = {}
    object = get_object_or_404(User, username=request.user.username)

    if request.method == "POST":
        object.delete()
        return HttpResponseRedirect("/")

    return render(request, "users/delete_user.html", context)


@custom_login_required
def update_user(request):
    context = {}

    object = get_object_or_404(User, username=request.user.username)

    form = UpdateUserForm(request.POST or None, instance=object)

    if form.is_valid():
        form.save()
        return HttpResponseRedirect("../profile/")

    context["form"] = form
    return render(request, "users/update_user.html", context)


@custom_login_required
def update_preferences(request):
    user: User = request.user
    print(user.preference_diet, user.preference_health)
    prefs = json.loads(request.body)["prefs"]

    user.preference_health = prefs["healthTags"]
    user.preference_diet = prefs["dietTags"]
    print(user.preference_diet, user.preference_health)
    user.save()
    return HttpResponse(200)


@custom_login_required
def edit_favorites(request):
    user: User = request.user
    favorites: list = user.favorites
    if not favorites:
        favorites = []

    info = json.loads(request.body)

    if not info:
        return JsonResponse(
            {
                "status": "failed",
                "message": "Missing data",
            },
            status=400,
        )
    if info["command"] == "add" and info["recipe"] not in favorites:
        favorites.append(info["recipe"])
    elif info["command"] == "remove" and info["recipe"] in favorites:
        favorites.remove(info["recipe"])

    user.favorites = favorites
    user.save()

    return JsonResponse(
        {
            "status": "success",
        },
        status=200,
    )


@custom_login_required
def change_password(request):
    context = {}

    form = PasswordChangeForm(user=request.user, data=request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            form.save()
            update_session_auth_hash(request, form.user)
            return HttpResponseRedirect("../profile/")

        else:
            context["error"] = "Passwords don't match."

    context["form"] = form
    return render(request, "users/change_password.html", context)
