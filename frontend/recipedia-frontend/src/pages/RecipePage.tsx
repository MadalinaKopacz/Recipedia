import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StartPageHeader from "../components/Headers/StartPageHeader";
import RecipeBody from "../components/RecipePage/RecipeBody";
import { Recipe } from "../DTOs";
import ENV from "../env";
import E404Page from "./404Page";

const RecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [isError, setError] = useState<boolean>();
  const params = useParams();
  const navigate = useNavigate();

  const searchRecipe = useCallback(() => {
    if (!ENV.BASE_RECIPE_URL) {
      return;
    }
    let url = ENV.BASE_RECIPE_URL + "/" + params.id;

    axios
      .get(url, {
        params: {
          type: "public",
          app_id: ENV.RECIPE_SEARCH_APP_ID,
          app_key: ENV.RECIPE_SEARCH_APP_KEY,
        },
      })
      .then((response) => {
        setRecipe(response.data.recipe);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 404) {
          setError(true);
        }
      });
  }, [params.id]);

  useEffect(() => {
    searchRecipe();
  }, [searchRecipe]);

  if (isError) {
    return <E404Page />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <>
      <StartPageHeader />
      <RecipeBody recipe={recipe} />
    </>
  );
};

export default RecipePage;
