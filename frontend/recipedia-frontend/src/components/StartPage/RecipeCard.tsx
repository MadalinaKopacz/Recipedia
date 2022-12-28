import { Box, Card, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  label: string;
  image: string;
  dishType: [string];
  categories: [string];
}

export default function StepCard(props: RecipeInfo) {
  const userToken = localStorage.getItem("userToken");
  const [favRecipes, setFavRecipes] = useState<RecipeInfo[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: userToken,
        },
      })
      .then((resp) => JSON.parse(resp.data.user)[0].fields)
      .then((userData) => {
        setFavRecipes(userData?.favorites);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userToken]);

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

        <Grid
          container
          sx={{
            borderTop: "1px solid #000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={10}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontWeight: 700,
                color: "#383535",
                textDecoration: "none",
                marginX: 4,
                paddingTop: 2,
                paddingBottom: 3,
              }}
              variant="h5"
            >
              {props.dishType && props.dishType[0] ? "Category: " : ""}
              {props.dishType && props.dishType[0] ? props.dishType[0] : ""}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              marginRight: 2,
            }}
          >
            {/* {user ? (
                      <img src="media/favorite-heart.svg" alt="not-favorite-heart" onClick={handleFavoriteOnClick}/>
                      ))
                     : (
                      <Typography sx={{ fontSize: 18, opacity: 0.6 }}>
                        No favorite recipes.
                      </Typography>
                    )} */}
            <img src="media/favorite-heart-red.svg" alt="not-favorite-heart" />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
