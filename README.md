# RECIPEDIA

## Database
For our database we use SQLite. Our User Table is implemented with [Django User model](https://docs.djangoproject.com/en/4.1/ref/contrib/auth/), but we also added profile_picture, preference_health, preference_diet and favorites fields.

![tabela user drawio](https://user-images.githubusercontent.com/79279298/206871861-21fbb476-f74b-42d0-ba7f-fb1b6afdd437.png)

Moreover, for integrating the recipes, we use the [Recipe Search API](https://developer.edamam.com/edamam-docs-recipe-api).
