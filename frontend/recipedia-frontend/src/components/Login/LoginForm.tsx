import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/user/login/", { username, password })
      .then((response) => {
        console.log("response");
        if (response.data.status === "failed") {
          alert("Failed login");
        } else {
          alert("Logged in");
        }
      })
      .catch((errors) => console.log("errors"));
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
        <FormControl sx={{ padding: 2, width: "50%" }}>
          <TextField
            required
            id="username"
            label="Username/email"
            placeholder="Your username/email"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
          />
        </FormControl>
        <FormControl sx={{ padding: 2, width: "50%" }}>
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            placeholder="Your password"
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
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
      </Box>
    </Box>
  );
}
