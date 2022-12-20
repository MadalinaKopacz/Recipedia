import { Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Recipe } from "../../DTOs";
import ENV from "../../env";
import RecipeCard from "./RecipeCard";

export default function RecipesList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    if (!ENV.BASE_RECIPE_URL) {
      return;
    }
    axios
      .get(ENV.BASE_RECIPE_URL, {
        params: {
          type: "any",
          q: "any",
          app_id: ENV.RECIPE_SEARCH_APP_ID,
          app_key: ENV.RECIPE_SEARCH_APP_KEY,
          random: "true",
        },
      })
      .then((response) => {
        setRecipes(response.data.hits);
        console.log("RECIPES: ", recipes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          marginTop: 60,
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
            fontFamily: "fantasy",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            textAlign: "center",
            margin: "auto",
            width: "60%",
          }}
        >
          See the recipes that await you
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <RecipeCard
            label={recipe.recipe.label}
            image={recipe.recipe.image}
            dishType={recipe.recipe.dishType}
            categories={recipe.recipe.categories}
          />
        ))}
      </Grid>
    </>
  );
}
