import { Container } from "@mui/material";
import { Recipe } from "../../DTOs";
import Calories from "./Calories";
import GoToRecipeDirections from "./GoToRecipeDirections";
import IngredientsList from "./IngredientsList";
import LabelList from "./LabelList";
import RecipeDetails from "./RecipeDetails";
import RecipeIntro from "./RecipeIntro";

interface RecipeInfo {
  recipe: Recipe;
}

export default function RecipeBody({ recipe }: RecipeInfo) {
  return (
    <Container
      style={{
        backgroundColor: "#F9F3ED",
        marginTop: 120,
        marginBottom: 50,
        paddingTop: 1,
        borderRadius: 10,
        paddingBottom: 1,
      }}
    >
      <RecipeIntro recipe={recipe} />
      <RecipeDetails recipe={recipe} />
      <LabelList
        title={"Health"}
        list={recipe.healthLabels}
        color={"#B1C6BF"}
      />
      <LabelList title={"Diet"} list={recipe.dietLabels} color={"#FCDB9B"} />
      <Calories recipe={recipe} />
      <IngredientsList recipe={recipe} />
      <GoToRecipeDirections recipe={recipe} />
    </Container>
  );
}
