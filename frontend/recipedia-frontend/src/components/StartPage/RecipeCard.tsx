import { Box, Card, Grid, Typography } from "@mui/material";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  label: string;
  image: string;
  dishType: [string];
  categories: [string];
}

export default function StepCard(props: RecipeInfo) {
  return (
    <Grid item xs={3} textAlign={"center"} minWidth={450}>
      <Card
        sx={{
          height: 500,
          borderRadius: 5,
          marginTop: 5,
          marginX: 5,
        }}
        elevation={8}
      >
        <img
          src={props.image}
          alt={props.label}
          width="100%"
          height="40%"
          style={{ objectFit: "cover" }}
        />
        <Typography
          sx={{
            fontFamily: "fantasy",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            margin: "auto",
            paddingTop: 5,
          }}
          variant="h4"
        >
          {props.label}
        </Typography>
        <Typography
          sx={{
            fontFamily: "fantasy",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            margin: "auto",
            paddingTop: 5,
          }}
          variant="h4"
        >
          {props.dishType[0]}
        </Typography>
      </Card>
    </Grid>
  );
}
