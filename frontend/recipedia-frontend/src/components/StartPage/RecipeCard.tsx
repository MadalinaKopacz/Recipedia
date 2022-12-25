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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#383535",
            marginX: 4,
            flex: 1,
            paddingTop: 3,
          }}
          variant="h4"
        >
          {props.label}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            marginX: 4,
            paddingTop: 2,
            paddingBottom: 3,
            borderTop: "1px solid #000",
          }}
          variant="h5"
        >
          {props.dishType && props.dishType[0] ? "Category: " : ""}
          {props.dishType && props.dishType[0] ? props.dishType[0] : ""}
        </Typography>
      </Card>
    </Grid>
  );
}
