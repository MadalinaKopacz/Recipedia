import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import axios from "axios";
import qs from "qs";
import React, { useState, useEffect, useCallback } from "react";
import { Recipe, User } from "../../DTOs";
import ENV from "../../env";
import RecipeCard from "./RecipeCard";

export default function RecipesList() {
  const [value, setValue] = useState("");
  const [recipesSuggestions, setRecipesSuggestions] = useState<string[]>([]);
  const [chosenRecipe, setChosenRecipe] = useState<string[]>([]);
  const [unknownRecipe, setUnknownRecipe] = useState<boolean>(false);
  const numberOfSuggestions: Number = 5;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>();

  const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : "";

  if (userToken && !user) {
    axios
      .get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        setUser(JSON.parse(response.data.user)[0].fields);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const searchRecipes = useCallback(
    (q: string) => {
      if (!ENV.BASE_RECIPE_URL) {
        return;
      }
      let params = {};
      if (user) {
        if (user.preference_diet && user.preference_health) {
          params = {
            type: "any",
            q: q,
            app_id: ENV.RECIPE_SEARCH_APP_ID,
            app_key: ENV.RECIPE_SEARCH_APP_KEY,
            health: user.preference_health,
            diet: user.preference_diet,
            random: "true",
          };
        } else if (user.preference_diet) {
          params = {
            type: "any",
            q: q,
            app_id: ENV.RECIPE_SEARCH_APP_ID,
            app_key: ENV.RECIPE_SEARCH_APP_KEY,
            diet: user.preference_diet,
            random: "true",
          };
        } else if (user.preference_health) {
          params = {
            type: "any",
            q: q,
            app_id: ENV.RECIPE_SEARCH_APP_ID,
            app_key: ENV.RECIPE_SEARCH_APP_KEY,
            health: user.preference_health,
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
          setRecipes(response.data.hits);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [user]
  );

  useEffect(() => {
    searchRecipes("any");
  }, [searchRecipes, userToken]);

  if (!recipes) {
    return null;
  }
  return (
    <>
      <Box
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 100,
          marginBottom: 20,
          width: "40%",
          backgroundColor: "white",
          borderRadius: 15,
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            textAlign: "center",
            margin: "auto",
            width: "60%",
            padding: 2,
          }}
        >
          See the recipes that await you
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          marginTop: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
        }}
        spacing={0}
      >
        <Grid item xs={11}>
          <TextField
            id="outlined-basic"
            label="Search..."
            variant="outlined"
            inputProps={{ style: { fontSize: 18 } }}
            sx={{ width: "100%", background: "white", color: "black" }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            onClick={() => {
              searchRecipes(value);
            }}
            sx={{
              marginLeft: 1,
              height: "90%",
              width: "80%",
              background: "#383535",
              fontSize: 16,
              opacity: "80%",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#BEBEBE !important",
                color: "black",
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginBottom: 10 }}>
        {recipes.map((recipe) => (
          <RecipeCard
            label={recipe.recipe.label}
            image={recipe.recipe.image}
            dishType={recipe.recipe.dishType}
            categories={recipe.recipe.categories}
            recipe={recipe}
          />
        ))}
      </Grid>
    </>
  );
}
