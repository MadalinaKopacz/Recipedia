import functools
from django.shortcuts import redirect
from django.contrib import messages
from tokens.models import Token
from django.http import JsonResponse
from django.utils import timezone


def custom_login_required(view_func):
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get("token")
        if not token:
            return JsonResponse({"error": "Token required"}, status=400)
        try:
            token = Token.objects.get(value=token, expired_at__gte=timezone.now())
        except Token.DoesNotExist:
            return JsonResponse({"error": "Invalid token"}, status=401)
        request.user = token.user
        return view_func(request, *args, **kwargs)

    return wrapper
