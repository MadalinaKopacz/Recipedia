import { Grid, Typography } from "@mui/material";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  recipe: Recipe;
}

export default function RecipeDetails({ recipe }: RecipeInfo) {
  return (
    <Grid
      sx={{
        marginTop: 8,
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        backgroundColor: "#FFD9A1",
        display: "flex",
        flexDirection: "column",
        paddingX: 2,
      }}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontFamily: "Playfair", fontWeight: "bold" }}>
          CATEGORY
        </Typography>
        <Typography sx={{ fontFamily: "Playfair", fontWeight: "bold" }}>
          CUISINE
        </Typography>
      </Grid>
      <Grid
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontFamily: "Playfair" }}>
          {recipe.dishType[0]}
        </Typography>
        <Typography sx={{ fontFamily: "Playfair" }}>
          {recipe.cuisineType[0]}
        </Typography>
      </Grid>
    </Grid>
  );
}
