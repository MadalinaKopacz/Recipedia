from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_all_recipes, name="get_all_recipes"),
    path("<id>/", views.get_recipe_by_id, name="get_recipe"),
]
