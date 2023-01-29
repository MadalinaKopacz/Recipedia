import {
  Box,
  Grid,
  Paper,
  styled,
  Switch,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  recipe: Recipe;
}

export default function Calories({ recipe }: RecipeInfo) {
  const [checked, setChecked] = useState(false);

  const switchHandler = (e: any) => {
    setChecked(e.target.checked);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ marginTop: 8, paddingX: 2, alignSelf: "flex-start" }}>
        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ fontFamily: "Playfair", fontWeight: "bold" }}>
            Show Calories&Nutrients
          </Typography>
          <Switch color="warning" checked={checked} onChange={switchHandler} />
        </Grid>
      </Box>
      <Box sx={{ maxWidth: 800, alignSelf: "center" }}>
        {checked && (
          <TableContainer sx={{ marginTop: 2 }} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "2px solid black",

                    "& th": {
                      fontWeight: "bold",
                    },
                  }}
                >
                  <TableCell>Name</TableCell>
                  <TableCell>Absolute Nutrient Amount</TableCell>
                  <TableCell>
                    Percent of Daily Recommended Nutrient Intake
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(recipe.totalNutrients).map((key, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {recipe.totalNutrients[key].label}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {recipe.totalNutrients[key].quantity.toFixed(2)}{" "}
                      {recipe.totalNutrients[key].unit}
                    </TableCell>
                    {recipe.totalDaily[key] ? (
                      <TableCell component="th" scope="row">
                        {recipe.totalDaily[key].quantity.toFixed(2)}
                        {recipe.totalDaily[key].unit}
                      </TableCell>
                    ) : (
                      <TableCell component="th" scope="row">
                        -
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
