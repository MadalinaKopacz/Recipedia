import { Box, Card, Grid, Link, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../App";
import { Recipe } from "../../DTOs";

interface RecipeInfo {
  label: string;
  image: string;
  dishType: string[];
  categories: string[];
  recipe: Recipe;
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#EFE2D3",
  boxShadow: 24,
  p: 4,
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "15px",
};

export default function RecipeCard(props: RecipeInfo) {
  const [favRecipes, setFavRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const context = useAuth();

  const handleCardClick = () => {
    window.open(
      "/recipe/" +
        props.recipe.uri.substring(props.recipe.uri.lastIndexOf("_") + 1)
    );
  };

  useEffect(() => {
    if (context.user?.favorites != null) setFavRecipes(context.user?.favorites);
  }, [context.user?.favorites]);

  const addFavorite = (e: any) => {
    if (isFavorite) {
      return;
    }

    e.stopPropagation();
    setIsFavorite(true);
    axios
      .post(
        "http://localhost:8000/user/update_favorites/",
        { command: "add", recipe: props.recipe },
        {
          headers: {
            Authorization: context.token,
          },
        }
      )
      .then((resp) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFavorite = (e: any) => {
    if (!isFavorite) {
      return;
    }

    e.stopPropagation();
    setIsFavorite(false);
    axios
      .post(
        "http://localhost:8000/user/update_favorites/",
        { command: "remove", recipe: props.recipe },
        {
          headers: {
            Authorization: context.token,
          },
        }
      )
      .then((resp) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFavoriteOnClick = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleFavsLoggedInUser = () => {
    if (isFavorite) {
      return (
        <img
          src="/media/favorite-heart-red.svg"
          alt="favorite-heart-red"
          onClick={removeFavorite}
        />
      );
    } else {
      return (
        <img
          src="/media/not-favorite-heart-red.svg"
          alt="not-favorite-heart-red"
          onClick={addFavorite}
        />
      );
    }
  };
  const handleFavsNotLoggedInUser = () => {
    return (
      <img
        src="/media/not-favorite-heart-red.svg"
        alt="not-favorite-heart-red"
        onClick={handleFavoriteOnClick}
      />
    );
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setOpen(false);
  };

  useEffect(() => {
    if (favRecipes) {
      for (let i = 0; i < favRecipes.length; i++) {
        if (favRecipes[i].uri === props.recipe.uri) {
          setIsFavorite(true);
        }
      }
    }
  }, [context.token, favRecipes, props.recipe.uri]);

  return (
    <Grid
      item
      xs={3}
      textAlign={"center"}
      minWidth={450}
      onClick={handleCardClick}
    >
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
            <div>
              {context.user
                ? handleFavsLoggedInUser()
                : handleFavsNotLoggedInUser()}
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Typography sx={{ fontFamily: "Playfair" }}>
                    To add favorites, please{" "}
                    <Link
                      href="/login"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      log in
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/register"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      register
                    </Link>
                    .
                  </Typography>
                </Box>
              </Modal>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
