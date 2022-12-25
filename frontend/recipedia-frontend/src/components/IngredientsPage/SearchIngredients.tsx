import {
  Button,
  Grid,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ENV from "../../env";
import IngredientList from "./IngredientList";

const toTitleCase = (str: string) => {
  if (str === "") return "";
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

export default function SearchIngredients() {
  const [value, setValue] = useState("");
  const [ingSuggestions, setIngSuggestions] = useState<string[]>([]);
  const [chosenIng, setChosenIng] = useState<string[]>([]);
  const [unknownIng, setUnknownIng] = useState<boolean>(false);
  const numberOfSuggestions: Number = 5;

  const onChange = (event: any) => {
    const searchTerm: String = toTitleCase(event.target.value);

    axios
      .get("/auto-complete", {
        params: {
          q: searchTerm,
          app_id: ENV.FOOD_APP_ID,
          app_key: ENV.FOOD_APP_KEY,
          limit: numberOfSuggestions,
        },
      })
      .then((response) => {
        var suggestions = response.data.map((r: string) => toTitleCase(r));
        setIngSuggestions(suggestions.slice(0, numberOfSuggestions));
      })
      .catch((error) => {
        console.error(error);
      });

    setUnknownIng(false);
    setValue(event.target.value);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      if (ingSuggestions.length > 0)
        if (ingSuggestions.includes(toTitleCase(value))) {
          if (!chosenIng.includes(toTitleCase(value)))
            chosenIng.push(toTitleCase(value));
          setValue("");
          setIngSuggestions([]);
        }
    }
  };

  const onAddIng = (searchTerm: string) => {
    axios
      .get("/api/food-database/v2/parser", {
        params: {
          ingr: searchTerm,
          app_id: ENV.FOOD_APP_ID,
          app_key: ENV.FOOD_APP_KEY,
        },
      })
      .then((response) => {
        searchTerm = toTitleCase(searchTerm);
        if (response.data.parsed.length === 0) setUnknownIng(true);
        else {
          setUnknownIng(false);
          if (!chosenIng.includes(searchTerm)) chosenIng.push(searchTerm);
        }
        setValue("");
        setIngSuggestions([]);
      })
      .catch((error) => {
        console.error(error);
      });
    setValue(searchTerm);
  };

  return (
    <>
      <Grid
        container
        sx={{
          marginTop: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
        }}
        spacing={0}
      >
        <Grid item xs={12}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#383535",
              textDecoration: "none",
              margin: "auto",
              height: 50,
              paddingTop: 5,
              paddingBottom: 3,
            }}
            variant="h4"
          >
            What do you have in your fridge?
          </Typography>
        </Grid>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic"
            label="Ingredients"
            variant="outlined"
            inputProps={{ style: { fontSize: 18 } }}
            sx={{ width: "100%", background: "#EDEDED", color: "black" }}
            value={value}
            onChange={onChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            onClick={() => onAddIng(value)}
            sx={{
              marginLeft: 1,
              marginTop: "1.5%",
              height: "90%",
              width: "80%",
              background: "#383535",
              fontSize: 16,
              opacity: "80%",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#BEBEBE !important",
                color: "black",
              },
            }}
          >
            Add
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Stack
            spacing={0}
            sx={{
              visibility: ingSuggestions.length > 0 ? "visible" : "hidden",
              borderRadius: 2,
              minHeight: 210,
              background: "#EDEDED",
              boxShadow: ingSuggestions.length > 0 ? 3 : 0,
            }}
          >
            {ingSuggestions.map((suggestion) => (
              <ListItem
                onClick={() => {
                  setValue(suggestion);
                  setIngSuggestions([]);
                }}
                sx={{
                  background: "#EDEDED",
                  fontSize: 18,
                  padding: 1.5,
                  "&:hover": { backgroundColor: "#D3D3D3" },
                }}
              >
                {suggestion}
              </ListItem>
            ))}
            <div>
              {unknownIng === true ? (
                <ListItem
                  sx={{ background: "#EDEDED", fontSize: 18, padding: 1.5 }}
                >
                  Unknown Ingredient
                </ListItem>
              ) : (
                <></>
              )}
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 3 }}>
          <IngredientList ingredients={chosenIng}></IngredientList>
        </Grid>
      </Grid>
    </>
  );
}
