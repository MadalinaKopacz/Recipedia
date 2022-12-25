from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.create_user, name="register"),
    path("login/", views.login_view, name="login"),
    path("vlogin/", views.login_view_template, name="vlogin"),
    path("profile/", views.get_user_details, name="profile"),
    path("delete_user/", views.delete_user, name="delete_user"),
    path("update_user/", views.update_user, name="update_user"),
    path("change_password/", views.change_password, name="change_password"),
]
