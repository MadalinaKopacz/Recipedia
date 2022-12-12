from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_all_recipes, name="get_all_recipes"),
    path("ingredients/", views.get_all_ingredients, name="get_all_ingredients"),
    path("<id>/", views.get_recipe_by_id, name="get_recipe"),
]
