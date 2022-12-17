from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

UserModel = get_user_model()


class AuthenticationBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Overload authenticate
        try:
            user = UserModel.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except:
            return

        if user.check_password(password) and self.user_can_authenticate(user):
            return user