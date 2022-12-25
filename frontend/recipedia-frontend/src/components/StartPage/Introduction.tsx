import {
  Box,
  Card,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
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
  return (
    <>
      <ImageList
        sx={{ height: "100%", paddingTop: 18, paddingRight: 20 }}
        cols={3}
      >
        {itemData.map((item) => (
          <ImageListItem
            sx={{
              height: "500",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            key={item.img}
          >
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
              style={{
                paddingTop: item.title === "Cooking" ? 70 : 0,
                marginLeft: item.title === "Cooking" ? 0 : 120,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Box
        sx={{
          display: "flex",
          zIndex: "modal",
          alignItems: "center",
          justifyContent: "center",
          ml: "5rem",
          mt: "5rem",
        }}
      >
        <Fab
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
        <Fab
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
      </Box>

      <Box
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          padding: 50,
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
            width: "65%",
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
            width: "35%",
          }}
        >
          are out of inspiration
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
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
