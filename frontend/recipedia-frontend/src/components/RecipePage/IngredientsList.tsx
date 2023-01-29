import { Box, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Recipe } from "../../DTOs";
import ShoppingList from "./ShoppingList";

interface RecipeInfo {
  recipe: Recipe;
}

export default function IngredientsList({ recipe }: RecipeInfo) {
  let auxArray: boolean[] = [];
  for (let i = 0; i < recipe.ingredientLines.length; i++) {
    auxArray.push(false);
  }
  const [checkedArray, setCheckedArray] = useState<boolean[]>(auxArray);

  const updateChecked = (index: number) => {
    setCheckedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid black",
        marginTop: 8,
        paddingX: 2,
      }}
    >
      <Box
        sx={{
          height: 100,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Playfair",
            fontWeight: "bold",
            fontSize: 30,
            color: "#DD0426",
          }}
        >
          Here's what you'll need for this delicious recipe:
        </Typography>
        <Typography
          sx={{
            fontFamily: "Playfair",
            fontWeight: "bold",
            fontSize: 12,
            color: "#383535",
          }}
        >
          Check the ingredients you already have, so you won't be shopping for them.
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: 2,
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
        }}
      >
        {recipe.ingredientLines.map((ingredient, index) => (
          <Box
            sx={{
              paddingX: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{ color: "#B1C6BF" }}
              checked={checkedArray[index]}
              onClick={() => updateChecked(index)}
            />
            <Typography
              sx={{
                fontFamily: "Playfair",
                padding: 0.5,
              }}
            >
              {ingredient}
            </Typography>
          </Box>
        ))}
        <ShoppingList
          recipeName={recipe.label}
          ingredientList={recipe.ingredientLines}
          checkedArray={checkedArray}
        />
      </Box>
    </Box>
  );
}
