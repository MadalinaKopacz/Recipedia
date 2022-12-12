import requests
from django.shortcuts import render
import json
from django.conf import settings

RECIPE_SEARCH_APP_ID = getattr(settings, "RECIPE_SEARCH_APP_ID", None)
RECIPE_SEARCH_APP_KEY = getattr(settings, "RECIPE_SEARCH_APP_KEY", None)
BASE_RECIPE_URL = getattr(settings, "BASE_URL", None)
BASE_FOOD_URL = getattr(settings, "BASE_FOOD_URL", None)
FOOD_APP_KEY = getattr(settings, "FOOD_APP_KEY", None)
FOOD_APP_ID = getattr(settings, "FOOD_APP_ID", None)


def get_all_recipes(request):
    params = {
        "type": "any",
        "app_id": RECIPE_SEARCH_APP_ID,
        "app_key": RECIPE_SEARCH_APP_KEY,
        "q": "any",
        "random": True,
    }
    r = requests.get(BASE_RECIPE_URL, params=params)
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
    BASE_URL_ID = BASE_RECIPE_URL + "/" + str(id)
    params = {
        "type": "public",
        "app_id": RECIPE_SEARCH_APP_ID,
        "app_key": RECIPE_SEARCH_APP_KEY,
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


def get_all_ingredients(request):
    context = {}
    params = {
        "app_id": FOOD_APP_ID,
        "app_key": FOOD_APP_KEY,
        "ingr": r".*"
    }

    response = requests.get(BASE_FOOD_URL + "/parser", params)
    response = response.json()

    ingredients = list(map(lambda r: r['food']['label'], response['hints']))
    context['ingredients'] = ingredients

    return render(request, "recipes/get_ingredients.html", context)