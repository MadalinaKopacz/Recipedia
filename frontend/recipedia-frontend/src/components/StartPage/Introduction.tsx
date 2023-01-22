import {
  Box,
  Card,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  Fab,
} from "@mui/material";
import { useContext } from "react";
import { useAuth } from "../../App";
import StepCard from "./StepCard";

const itemData = [
  {
    img: "media/bowl.svg",
    title: "Bowl",
  },
  {
    img: "media/write_rect.svg",
    title: "Writing",
  },
  {
    img: "media/cooking.svg",
    title: "Cooking",
  },
];

export default function Introduction() {
  const context = useAuth();
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <ImageList
          sx={{
            height: "100%",
            paddingTop: 18,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          cols={3}
        >
          {itemData.map((item) => (
            <ImageListItem
              sx={{
                height: "500",
                display: "block",
                marginLeft: "-4rem",
                marginRight: "-4rem",
                zIndex: item.title === "Writing" ? 20 : 10,
              }}
              key={item.img}
            >
              <img
                src={`${item.img}`}
                srcSet={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ml: "5rem",
            mt: "5rem",
            position: "absolute",
            top: "30%",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Fab
            href="/ingredients"
            sx={{
              my: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{
              width: "132px",
              height: "66px",
              color: "#1C7054",
              backgroundColor: "#E5E5E5",
              borderRadius: 30,
              textTransform: "none",
              fontFamily: "'Roboto'",
              fontSize: "20px",
              fontWeight: 700,
              marginRight: 30,
            }}
          >
            Try now
          </Fab>
          {!context.user && (
            <Fab
              href="/register"
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              style={{
                width: "160px",
                height: "66px",
                color: "#1C7054",
                backgroundColor: "#E5E5E5",
                borderRadius: 30,
                textTransform: "none",
                fontFamily: "'Roboto'",
                fontSize: "20px",
                fontWeight: 700,
                marginRight: 30,
              }}
            >
              Get an account
            </Fab>
          )}
        </Box>
      </Box>

      <Box
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          padding: 50,
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            textAlign: "center",
            margin: "auto",
            width: "80%",
          }}
        >
          Receive delicious recipes ideas when you...
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mr: 2,
            display: { md: "flex" },
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#DD0426",
            textDecoration: "none",
            textAlign: "center",
            margin: "auto",
            width: "45%",
          }}
        >
          are out of inspiration
        </Typography>
      </Box>

      <Grid
        container
        spacing={7}
        sx={{
          display: "flex",
        }}
        justifyContent="center"
      >
        <StepCard
          title="Step 1"
          description="Choose what ingredients you have in your fridge"
        />
        <StepCard title="Step 2" description="See the recommended recipes" />
        <StepCard title="Step 3" description="Cook and enjoy your meal!" />
      </Grid>
    </>
  );
}
