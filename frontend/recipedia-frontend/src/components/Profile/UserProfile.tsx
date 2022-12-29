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
import { useState, useEffect } from "react";
import { User, Recipe } from "../../DTOs";
import ENV from "../../env";
import RecipeCard from "../StartPage/RecipeCard";

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
  const userToken = localStorage.getItem("userToken");
  const [user, setUser] = useState<User>();
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [favRecipes, setFavRecipes] = useState<Recipe[]>([]);
  const [healthTags, setHealthTags] = useState<string[]>([]);
  const [dietTags, setDietTags] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: userToken,
        },
      })
      .then((resp) => JSON.parse(resp.data.user)[0].fields)
      .then((userData) => {
        setUser(userData);
        if (userData?.preference_diet != null)
          setDietTags(userData?.preference_diet);
        if (userData?.preference_health != null)
          setHealthTags(userData?.preference_health);
        if (userData?.favorites != null) setFavRecipes(userData?.favorites);
        if (userData?.profile_picture) {
          setProfilePicture(
            "http://localhost:8000/media/" + userData?.profile_picture
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userToken]);

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
    console.log(prefs);
    axios
      .post(
        "http://localhost:8000/user/set_prefs/",
        { prefs: prefs },
        {
          headers: {
            Authorization: userToken,
          },
        }
      )
      .then((response) => {
        alert("Preferences saved");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {user ? (
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
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        marginTop: 1,
                        fontSize: 25,
                        textDecoration: "underline",
                      }}
                    >
                      {user?.first_name + " " + user?.last_name}
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
                          sx={{ marginTop: 1, marginLeft: 3, fontSize: 15 }}
                        >
                          Username: {user?.username}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          sx={{ marginTop: 1, marginLeft: 3, fontSize: 15 }}
                        >
                          Email: {user?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ marginTop: 18 }}>
                    <Button variant="contained">Edit profile</Button>
                  </Grid>
                  <Grid item sx={{ marginTop: 1.5 }}>
                    <Button variant="contained">Change Password</Button>
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
                  >
                    Health preferences
                  </Typography>
                </Grid>
                <Grid item sx={{}}>
                  <Autocomplete
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
                    sx={{ fontSize: 25, fontWeight: "bold", marginLeft: 4 }}
                  >
                    Diet Preferences
                  </Typography>
                </Grid>
                <Grid item sx={{}}>
                  <Autocomplete
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
                  <Button variant="contained" onClick={savePrefs}>
                    Save
                  </Button>
                </Grid>
                <Grid item sx={{}}>
                  <Typography
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
                            label={recipe.recipe.label}
                            image={recipe.recipe.image}
                            dishType={recipe.recipe.dishType}
                            categories={recipe.recipe.categories}
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
