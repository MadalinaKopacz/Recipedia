import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["Home", "Recipes", "About Us"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
    <AppBar position="static" style={{ backgroundColor: "#383535" }}>
      <Toolbar disableGutters sx={{ height: 70 }}>
        <img src="media/logo.svg" alt="Recipedia logo" />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "fantasy",
            fontWeight: 700,
            color: "#FFA42C",
            textDecoration: "none",
          }}
        >
          Recipedia
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              style={{
                color: "white",
                borderRadius: 10,
                fontFamily: "fantasy",
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Button
            sx={{
              my: 2,
              display: "block",
            }}
            style={{
              color: "#DD0426",
              backgroundColor: "#FFD9A1",
              borderRadius: 10,
              textTransform: "none",
              fontFamily: "fantasy",
              fontWeight: "bold",
              marginRight: 30,
            }}
          >
            Log In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
