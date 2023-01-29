import { Box, Button, Grid, Chip, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../App";
import { Recipe } from "../../DTOs";
import ENV from "../../env";
import RecipeCard from "../StartPage/RecipeCard";

type Props = {
  ingredients: string[];
  onIngredientRemoved: (ingredient: string) => void;
};

export default function SearchIngredients({
  ingredients,
  onIngredientRemoved,
}: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const context = useAuth();

  const getRecipe = () => {
    let q: string = "";
    for (let i = 0; i < ingredients.length; i++) {
      q = q + ingredients[i] + " ";
    }
    if (!ENV.BASE_RECIPE_URL) {
      return;
    }
    let params = {};
    if (context.user) {
      if (context.user.preference_diet && context.user.preference_health) {
        params = {
          type: "any",
          q: q,
          app_id: ENV.RECIPE_SEARCH_APP_ID,
          app_key: ENV.RECIPE_SEARCH_APP_KEY,
          health: context.user.preference_health,
          diet: context.user.preference_diet,
          random: "true",
        };
      } else if (context.user.preference_diet) {
        params = {
          type: "any",
          q: q,
          app_id: ENV.RECIPE_SEARCH_APP_ID,
          app_key: ENV.RECIPE_SEARCH_APP_KEY,
          diet: context.user.preference_diet,
          random: "true",
        };
      } else if (context.user.preference_health) {
        params = {
          type: "any",
          q: q,
          app_id: ENV.RECIPE_SEARCH_APP_ID,
          app_key: ENV.RECIPE_SEARCH_APP_KEY,
          health: context.user.preference_health,
          random: "true",
        };
      }
    } else {
      params = {
        type: "any",
        q: q,
        app_id: ENV.RECIPE_SEARCH_APP_ID,
        app_key: ENV.RECIPE_SEARCH_APP_KEY,
        random: "true",
      };
    }

    axios
      .get(ENV.BASE_RECIPE_URL, {
        params: params,
        paramsSerializer: {
          indexes: null,
        },
      })
      .then((response) => {
        let newRecipes: Recipe[] = [];
        for (let i = 0; i < response.data.hits.length; i++) {
          newRecipes.push(response.data.hits[i].recipe);
        }
        setRecipes(newRecipes);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box
        sx={{
          overflow: "auto",
          width: "100%",
          height: 250,
          backgroundColor: "#383535",
          opacity: "80%",
          borderRadius: 2,
        }}
      >
        {ingredients.length === 0 ? (
          <Typography
            sx={{
              color: "white",
              fontSize: 50,
              paddingTop: 7,
              textAlign: "center",
            }}
          >
            Use the search bar to add the ingredients you already have to browse
            for recipes
          </Typography>
        ) : (
          <Grid container sx={{ padding: 2, height: "80%" }}>
            {ingredients.map((ingredient) => (
              <Chip
                label={ingredient}
                variant="outlined"
                sx={{
                  padding: 1.2,
                  minWidth: 120,
                  height: 35,
                  fontSize: 15,
                  color: "white",
                  background: "RGBA(255,94, 5, 0.8)",
                  marginLeft: 0.4,
                  marginRight: 0.4,
                }}
                onDelete={() => onIngredientRemoved(ingredient)}
              />
            ))}
          </Grid>
        )}
        <Button
          variant="contained"
          sx={{
            position: "relative",
            left: "88%",
            bottom: "5%",
            background: "#DD0426",
            paddingleft: 2,
            paddingRight: 2,
            fontSize: 18,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#D24787" },
          }}
          onClick={getRecipe}
        >
          Get Recipe!
        </Button>
      </Box>
      <Grid
        container
        sx={{
          width: "100%",
          height: 570,
        }}
        overflow="auto"
        flexDirection={"column"}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              label={recipe.label}
              image={recipe.image}
              dishType={recipe.dishType}
              categories={recipe.categories}
              recipe={recipe}
            />
          ))
        ) : (
          <Typography
            sx={{
              color: "#383535",
              fontSize: 50,
              paddingTop: 7,
              textAlign: "center",
              opacity: "80%",
            }}
          >
            No recipes here!
          </Typography>
        )}
      </Grid>
    </>
  );
}
