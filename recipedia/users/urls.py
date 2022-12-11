from django.urls import path
from . import views

urlpatterns = [  
    path('create/', views.create_user_view, name='create'),
    path('profile/', views.get_user_details, name='profile'),
]