import axios from "axios";
import React, { useState, useEffect } from "react";
import { Recipe } from "../DTOs";
import ENV from "../env";

const StartPage = () => {
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
        console.log(response.data.hits);
        setRecipes(response.data.hits);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!recipes) {
    return null;
  }

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.recipe.label}>{recipe.recipe.label}</li>
      ))}
    </ul>
  );
};

export default StartPage;
