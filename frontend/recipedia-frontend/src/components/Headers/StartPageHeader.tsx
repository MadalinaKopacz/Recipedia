import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { User } from "../../DTOs";
import * as React from "react";
import { useNavigate } from "react-router-dom";

const pages = ["Home", " Get Recipes"];
const routes = ["/", "/ingredients"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [user, setUser] = React.useState<User>();

  const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : "";

  const navigate = useNavigate();

  if (userToken && !user) {
    axios
      .get("http://localhost:8000/user/profile/", {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        setUser(JSON.parse(response.data.user)[0].fields);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const logoutUser = () => {
    if (userToken) {
      axios
        .post(
          "http://localhost:8000/user/logout/",
          {},
          {
            headers: {
              Authorization: userToken,
            },
          }
        )
        .then((response) => {
          localStorage.removeItem("userToken");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{ width: "100%", backgroundColor: "#383535" }}>
      <Toolbar disableGutters sx={{ height: 70 }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            ml: 3,
            display: { xs: "none", md: "flex" },
            fontFamily: "Playfair",
            fontWeight: 700,
            color: "#FFA42C",
            textDecoration: "none",
          }}
        >
          Recipedia
        </Typography>
        <img
          src="media/small-logo.svg"
          alt="Recipedia logo"
          style={{ width: "3rem" }}
        />

        <Box
          sx={{ ml: "2%", flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          {pages.map((page, index) => (
            <Button
              key={page}
              href={routes[index]}
              style={{
                color: "white",
                borderRadius: 10,
                fontFamily: "'Roboto'",
                fontWeight: 700,
                fontSize: "1srem",
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {!userToken && (
          <>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                href="/login"
                sx={{
                  my: 2,
                  display: "block",
                }}
                style={{
                  color: "#DD0426",
                  backgroundColor: "#FFD9A1",
                  borderRadius: 10,
                  textTransform: "none",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  marginRight: 30,
                }}
              >
                Log In
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                href="/register"
                sx={{
                  my: 2,
                  display: "block",
                }}
                style={{
                  color: "#FFD9A1",
                  backgroundColor: "#DD0426",
                  borderRadius: 10,
                  textTransform: "none",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  marginRight: 30,
                }}
              >
                Register
              </Button>
            </Box>
          </>
        )}
        {userToken && user && (
          <>
            <Box className="desktop-only " sx={{ flexGrow: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  my: 2,
                  display: "block",
                }}
                style={{
                  color: "#FFD9A1",
                  borderRadius: 10,
                  textTransform: "none",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  marginRight: 30,
                }}
              >
                Hello,{" "}
                <span style={{ color: "#DD0426" }}>
                  {user.first_name + " " + user.last_name}
                </span>{" "}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                href="/profile"
                sx={{
                  my: 2,
                  display: "block",
                }}
                style={{
                  color: "#DD0426",
                  backgroundColor: "#FFD9A1",
                  borderRadius: 10,
                  textTransform: "none",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  marginRight: 30,
                }}
              >
                Your profile
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={logoutUser}
                sx={{
                  my: 2,
                  display: "block",
                }}
                style={{
                  color: "#FFD9A1",
                  backgroundColor: "#DD0426",
                  borderRadius: 10,
                  textTransform: "none",
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  marginRight: 30,
                }}
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
