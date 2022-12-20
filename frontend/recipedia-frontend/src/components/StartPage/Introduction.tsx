import { Box, Card, Grid, Typography } from "@mui/material";
import StepCard from "./StepCard";

export default function Introduction() {
  return (
    <>
      <Box justifyContent="center">
        <img
          src="media/group1.svg"
          alt="Group1"
          height="500"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
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
            fontFamily: "fantasy",
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
            fontFamily: "fantasy",
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
