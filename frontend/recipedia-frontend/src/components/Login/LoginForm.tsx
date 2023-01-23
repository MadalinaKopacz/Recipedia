import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const context = useAuth();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login/", { username, password })
      .then((response) => {
        context.login(response.data.token);
      })
      .catch((errors) => {
        setErrorMessage(errors.response.data.message);
        console.log(errors);
      });
  };

  return (
    <Box display="block" width="100%" marginRight="5vw" minWidth="500px">
      <Typography
        variant="h1"
        sx={{
          mr: 2,
          display: { md: "flex" },
          fontFamily: "Playfair",
          fontWeight: 700,
          color: "#383535",
          textDecoration: "none",
          textAlign: "center",
          margin: "auto",
          marginBottom: "-2.5rem",
          width: "65%",
        }}
      >
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          zIndex: "modal",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
        style={{
          width: "60%",
          padding: "5%",
          backgroundColor: "#FFFFFF",
          borderRadius: 60,
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <br />

        <FormControl sx={{ padding: 0.5, width: "50%" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Username/Email
          </InputLabel>
          <Input
            required
            id="username"
            placeholder="Your username/email"
            fullWidth={true}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
          />
        </FormControl>
        <br />
        <FormControl sx={{ padding: 0.5, width: "50%" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            required
            id="password"
            autoComplete="current-password"
            placeholder="Your password"
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          type="submit"
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
            color: "#DD0426",
            backgroundColor: "#FFD9A1",
            borderRadius: 30,
            textTransform: "none",
            fontFamily: "'Roboto'",
            fontSize: "20px",
            fontWeight: 800,
          }}
        >
          Login
        </Button>
        <Box height={"30px"}>
          {errorMessage != "" && (
            <Typography
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "Playfair",
                fontWeight: 700,
                color: "#dd0426",
                textDecoration: "none",
                textAlign: "center",
                margin: "auto",
                marginBottom: "-2.5rem",
                width: "65%",
              }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
        <Box height={"30px"}>
          <Typography sx={{ fontFamily: "Playfair" }}>
            Don't have an account yet? No problem! Just{" "}
            <Link href="/register">register</Link> now to get started.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
