import { Box, Typography } from "@mui/material";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  recipe: Recipe;
}

export default function GoToRecipeDirections({ recipe }: RecipeInfo) {
  const redirectSource = () => {
    if (recipe.source) window.open(recipe.url);
  };

  return (
    <Box
      sx={{
        marginTop: 6,
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        backgroundColor: "#B1C6BF",
        paddingX: 2,
        marginBottom: 8,
        height: 100,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={redirectSource}
    >
      <Typography
        sx={{
          fontFamily: "Playfair",
          fontWeight: "bold",
          fontSize: 30,
          alignSelf: "center",
        }}
      >
        Go to recipe directions
      </Typography>
    </Box>
  );
}
