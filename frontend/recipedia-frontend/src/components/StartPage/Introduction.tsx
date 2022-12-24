import { Box, Button, Card, Grid, Typography } from "@mui/material";
import StepCard from "./StepCard";

export default function Introduction() {
  return (
    <>
      <Box sx={{mt: "5rem"}} justifyContent="center">
        <img
          src="media/landing-img.svg"
          alt="Landing"
          height="500"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        {/* TO-DO: display buttons on top of image*/}
        <Box sx={{
          display: "flex",
          zIndex: 'modal',
          alignItems: "center",
          justifyContent: "center",
          ml: "5rem"}} >
          <Button
            sx={{
              my: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
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
          </Button>
          <Button
            sx={{
              my: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
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
          </Button>
        </Box>
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
