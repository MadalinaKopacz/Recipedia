import { Box, Button, Container, Fab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Headers/StartPageHeader";

const E404Page = () => {
  const navigate = useNavigate();
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          marginTop: "5%",
          width: "50rem",
          height: "45rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography
          variant="h1"
          noWrap
          sx={{
            ml: 3,
            display: { xs: "none", md: "flex" },
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            fontSize: "8rem",
            marginLeft: "25%",
            marginBottom: "0.3rem",
          }}
        >
          {" "}
          Sorry
        </Typography>
        <Typography
          variant="h4"
          noWrap
          sx={{
            ml: 3,
            display: { xs: "none", md: "flex" },
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#383535",
            textDecoration: "none",
            marginLeft: "25%",
          }}
        >
          {" "}
          we couldn't find that page
        </Typography>
        <Fab
          sx={{ my: 2, display: "block" }}
          style={{
            color: "#DD0426",
            backgroundColor: "#FFD9A1",
            borderRadius: 20,
            width: "25rem",
            height: "3.5rem",
            fontSize: "24px",
            marginLeft: "25%",
            textTransform: "none",
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginRight: 30,
            padding: "auto",
            textAlign: "center",
            boxShadow: "1px 1px 5px #383535",
          }}
          onClick={() => navigate("/")}
        >
          Go to the homepage
        </Fab>

        <img
          src="media/404img.svg"
          alt="404 Error"
          style={{
            width: "35rem",
            position: "absolute",
            top: "20rem",
            marginLeft: "6.5%",
          }}
        />
      </Box>
    </>
  );
};

export default E404Page;
