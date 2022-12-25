import { Box, Button, Grid, Chip, Typography } from "@mui/material";
import { useState } from "react";

export default function SearchIngredients({ingredients=[""]}) {
    const [ings, SetIngs] = useState(ingredients);

    const removeIngredient = (ingredient: string) => {
        SetIngs(ingredients.filter((ing) => ing != ingredient))
    }

    return(
        <Box sx={{overflow: "auto", width: "100%", height: 250, backgroundColor: '#383535', opacity: "80%", borderRadius: 2}}>
            {ings.length === 0 
            ? <Typography
                sx={{
                    color: 'white',
                    fontSize: 50,
                    paddingTop: 7,
                    textAlign: "center"
                    }}>
                Use the search bar to add the ingredients you already have to browse for recipes
                </Typography>
            : <Grid container sx={{padding: 2, height: "80%"}}>
                {ings.map((ingredient) => 
                <Chip 
                label={ingredient} 
                variant="outlined" 
                sx={{
                    padding: 1.2,
                    minWidth: 120,
                    height: 35,
                    fontSize: 15,
                    color: "white",
                    background: "RGBA(255,94, 5, 0.8)",
                    marginLeft: 0.4,
                    marginRight: 0.4
                }}
                onDelete={() => removeIngredient(ingredient)}/>)}
              </Grid>
           }
           <Button 
                variant="contained"
                sx={{position: "relative",
                     left: "88%",
                     bottom: "5%",
                     background: "#DD0426",
                     paddingleft: 2,
                     paddingRight: 2,
                     fontSize: 18,
                     fontWeight: "bold",
                     "&:hover": {backgroundColor: "#D24787"}}}>
            Get Recipe!
           </Button>
    </Box>)
}