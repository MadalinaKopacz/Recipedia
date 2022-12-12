from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.create_user_view, name="register"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("profile/", views.get_user_details, name="profile"),
    path("delete_user/", views.delete_user, name="delete_user"),
]

