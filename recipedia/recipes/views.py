import requests
from django.shortcuts import render
import json
from django.http import HttpResponse
from django.conf import settings

APP_ID = getattr(settings, "RECIPE_SEARCH_APP_ID", None)
APP_KEY = getattr(settings, "RECIPE_SEARCH_APP_KEY", None)
BASE_URL = getattr(settings, "BASE_URL", None)


def get_all_recipes(request):
    params = {
        "type": "any",
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "q": "all",
        "random": True,
    }
    r = requests.get(BASE_URL, params=params)
    recipe_info = r.json()
    recipes = list(
        map(
            lambda rec: {
                "title": rec["recipe"]["label"],
                "ingredients": rec["recipe"]["ingredientLines"],
            },
            recipe_info["hits"],
        )
    )
    context = {"recipes": recipes}

    return render(request, "recipes/get_all_recipe.html", context)


def get_recipe_by_id(request, id):
    BASE_URL_ID = BASE_URL + "/" + str(id)
    params = {
        "type": "public",
        "app_id": APP_ID,
        "app_key": APP_KEY,
    }
    r = requests.get(BASE_URL_ID, params=params)
    recipe_info = r.json()
    context = {
        "recipe": {
            "title": recipe_info["recipe"]["label"],
            "ingredients": recipe_info["recipe"]["ingredientLines"],
        }
    }
    return render(request, "recipes/get_recipe.html", context)
