import { Paper, Grid, Typography } from "@mui/material";

interface Content {
  title: string;
  description: string;
}

export default function StepCard(props: Content) {
  return (
    <Grid item xs={2} textAlign={"center"} minWidth={350}>
      <Paper sx={{ height: 300, borderRadius: 5, paddingX: 2 }} elevation={8}>
        <Typography
          sx={{
            fontFamily: "fantasy",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            margin: "auto",
            height: 50,
            paddingTop: 5,
          }}
          variant="h4"
        >
          {props.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "fantasy",
            fontWeight: 700,
            color: "#DD0426",
            textDecoration: "none",
            margin: "auto",
            height: "inherit",
          }}
          variant="h5"
        >
          {props.description}
        </Typography>
      </Paper>
    </Grid>
  );
}