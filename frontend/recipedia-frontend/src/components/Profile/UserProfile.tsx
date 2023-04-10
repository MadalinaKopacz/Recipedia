import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Recipe } from "../../DTOs";
import ENV from "../../env";
import RecipeCard from "../StartPage/RecipeCard";
import EditProfile from "../EditProfile/EditProfile";
import ChangePassword from "../EditProfile/ChangePassword";
import { useAuth } from "../../App";
import DeleteAccount from "../EditProfile/DeleteAccounts";

const healthPrefs = [
  "alcohol-cocktail",
  "alcohol-free",
  "celery-free",
  "crustacean-free",
  "dairy-free",
  "DASH",
  "egg-free",
  "fish-free",
  "fodmap-free",
  "gluten-free",
  "immuno-supportive",
  "keto-friendly",
  "kidney-friendly",
  "kosher",
  "low-potassium",
  "low-sugar",
  "lupine-free",
  "Mediterranean",
  "mollusk-free",
  "mustard-free",
  "No-oil-added",
  "paleo",
  "peanut-free",
  "pecatarian",
  "pork-free",
  "red-meat-free",
  "sesame-free",
  "shellfish-free",
  "soy-free",
  "sugar-conscious",
  "sulfite-free",
  "tree-nut-free",
  "vegan",
  "vegetarian",
  "wheat-free",
];
const dietPrefs = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];

export default function UserProfile() {
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [favRecipes, setFavRecipes] = useState<Recipe[]>([]);
  const [healthTags, setHealthTags] = useState<string[]>([]);
  const [dietTags, setDietTags] = useState<string[]>([]);
  const context = useAuth();
  useEffect(() => {
    if (context.user?.preference_diet != null)
      setDietTags(context.user?.preference_diet);
    if (context.user?.preference_health != null)
      setHealthTags(context.user?.preference_health);
    if (context.user?.favorites != null) setFavRecipes(context.user.favorites);
    if (context.user?.profile_picture) {
      setProfilePicture(
        "http://localhost:8000/media/" + context.user?.profile_picture
      );
    }
  }, [
    context.user?.favorites,
    context.user?.preference_diet,
    context.user?.preference_health,
    context.user?.profile_picture,
  ]);

  const savePrefs = (event: any) => {
    document.querySelectorAll("#healthTags").forEach((t) => {
      if (t.textContent && !healthTags.includes(t.textContent))
        healthTags.push(t.textContent);
    });

    document.querySelectorAll("#dietTags").forEach((t) => {
      if (t.textContent && !dietTags.includes(t.textContent))
        dietTags.push(t.textContent);
    });

    const prefs = { healthTags: healthTags, dietTags: dietTags };
    axios
      .post(
        "http://localhost:8000/user/set_prefs/",
        { prefs: prefs },
        {
          headers: {
            Authorization: context.token,
          },
        }
      )
      .then((response) => {
        context.refreshUser();
        alert("Preferences saved");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {context.user ? (
        <Box
          sx={{
            marginTop: 15,
            width: 1000,
            height: 1000,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#EDEDED",
            boxShadow: 3,
            borderRadius: 5,
            marginBottom: 8,
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ height: 1000 }}
          >
            <Grid
              item
              xs={4}
              sx={{
                width: 350,
                height: 1000,
                borderRight: 3,
                borderColor: "black",
              }}
            >
              <Box sx={{ width: "100%", height: 1000 }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar
                      src={profilePicture}
                      sx={{
                        marginTop: 1.5,
                        height: 150,
                        width: 150,
                        boxShadow: 1,
                      }}
                      data-cy="avatar"
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        marginTop: 1,
                        fontSize: 25,
                        textDecoration: "underline",
                      }}
                      data-cy="nume-prenume"
                    >
                      {context.user?.first_name + " " + context.user?.last_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="flex-start"
                      sx={{
                        paddingTop: 1,
                        paddingRight: 5,
                        paddingLeft: 5,
                        paddingBottom: 2,
                        marginTop: 7,
                        borderStyle: "solid",
                        borderColor: "#D3D3D3 !important",
                        boxShadow: 1,
                        background: "#DEE0E2",
                        border: 1,
                        borderRadius: 5,
                      }}
                    >
                      <Grid item>
                        <Typography
                          sx={{
                            marginTop: 1,
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          Details
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          data-cy="username"
                          sx={{ marginTop: 1, marginLeft: 3, fontSize: 15 }}
                        >
                          Username: {context.user?.username}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          data-cy="email"
                          sx={{ marginTop: 1, marginLeft: 3, fontSize: 15 }}
                        >
                          Email: {context.user?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item data-cy="edit-profile" sx={{ marginTop: 18 }}>
                    <EditProfile />
                  </Grid>
                  <Grid item data-cy="change-password" sx={{ marginTop: 1.5 }}>
                    <ChangePassword />
                  </Grid>
                  <Grid item data-cy="delete-account" sx={{ marginTop: 1.5 }}>
                    <DeleteAccount />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={8} sx={{ height: 1000 }}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ height: 1000, width: 630, marginTop: 0 }}
              >
                <Grid item sx={{ marginTop: 5.5 }}>
                  <Typography
                    sx={{ fontSize: 25, fontWeight: "bold", marginLeft: 4 }}
                    data-cy="health-pref"
                  >
                    Health Preferences
                  </Typography>
                </Grid>
                <Grid item sx={{}}>
                  <Autocomplete
                    data-cy="autocomplete-health"
                    multiple
                    id="tags-filled"
                    options={healthPrefs.map((option) => option)}
                    value={healthTags}
                    onChange={(e, value) => {
                      setHealthTags(value);
                    }}
                    freeSolo
                    sx={{ width: 570, marginLeft: 4 }}
                    renderTags={(healthTags: readonly string[], getTagProps) =>
                      healthTags.map((option: string, index: number) => (
                        <Chip
                          data-cy="chip-health"
                          variant="outlined"
                          id="healthTags"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        placeholder="Health Preferences"
                      />
                    )}
                  />
                </Grid>
                <Grid item sx={{ marginTop: 5.5 }}>
                  <Typography
                    data-cy="diet-pref"
                    sx={{ fontSize: 25, fontWeight: "bold", marginLeft: 4 }}
                  >
                    Diet Preferences
                  </Typography>
                </Grid>
                <Grid item sx={{}}>
                  <Autocomplete
                    data-cy="autocomplete-diet"
                    multiple
                    id="tags-filled"
                    options={dietPrefs.map((option) => option)}
                    value={dietTags}
                    onChange={(e, value) => {
                      setDietTags(value);
                    }}
                    freeSolo
                    sx={{ width: 570, marginLeft: 4 }}
                    renderTags={(dietTags: string[], getTagProps) =>
                      dietTags.map((option: string, index: number) => (
                        <Chip
                          data-cy="chip-diets"
                          variant="outlined"
                          id="dietTags"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        placeholder="Diet Preferences"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  sx={{ marginLeft: "auto", marginRight: 3, marginTop: 3 }}
                >
                  <Button data-cy="save" variant="contained" onClick={savePrefs}>
                    Save
                  </Button>
                </Grid>
                <Grid item sx={{}}>
                  <Typography
                    data-cy="favorites-text"
                    sx={{ fontSize: 25, fontWeight: "bold", marginLeft: 4 }}
                  >
                    Favorites
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    sx={{
                      width: 570,
                      height: 570,
                    }}
                    overflow="auto"
                    flexDirection={"column"}
                  >
                    {favRecipes ? (
                      favRecipes.map((recipe) => (
                        <Grid item xs={9}>
                          <RecipeCard
                            label={recipe.label}
                            image={recipe.image}
                            dishType={recipe.dishType}
                            categories={recipe.categories}
                            recipe={recipe}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Typography sx={{ fontSize: 18, opacity: 0.6 }}>
                        No favorite recipes.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
}
