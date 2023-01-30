import {
  Typography,
  FormControl,
  TextField,
  Box,
  Button,
  Avatar,
  IconButton,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterForm() {
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [profilepic, setProfilePic] = useState<File>();
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const [profilepicURL, setProfilePicURL] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const navigate = useNavigate();

  const emailRegex = new RegExp(
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(.[a-zA-Z](-?[a-zA-Z0-9])*)+$/
  );
  const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePhoto = (e: any) => {
    setProfilePic(e.target.files[0]);
    setProfilePicURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleRemovePhoto = () => {
    setProfilePic(undefined);
    setProfilePicURL("");
    URL.revokeObjectURL(profilepicURL);
    profilePicInputRef.current && (profilePicInputRef.current.value = "");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.includes("@")) {
      setErrorMessage("The username cannot include '@' character.");
      return;
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Email is incorrect.");
      return;
    } else if (password1 !== password2) {
      setErrorMessage("Your passwords do not match.");
      return;
    } else if (!passwordRegex.test(password1)) {
      setErrorMessage(
        "The password should have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number."
      );
      return;
    }

    let form_data = new FormData();
    if (profilepic) {
      form_data.append("profilepic", profilepic, profilepic.name);
    }
    form_data.append("firstname", fname);
    form_data.append("lastname", lname);
    form_data.append("username", username);
    form_data.append("email", email);
    form_data.append("password", password1);

    axios
      .post("http://localhost:8000/user/register/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setErrorMessage("");
        navigate("/login");
      })
      .catch((errors) => {
        setErrorMessage(errors.response.data.message);
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
        Register
      </Typography>
      <Box
        className="register-grid"
        component="form"
        sx={{
          margin: "auto",
        }}
        style={{
          width: "80%",
          padding: "5%",
          paddingLeft: "8%",
          paddingRight: "8%",
          backgroundColor: "#FFFFFF",
          borderRadius: 60,
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl sx={{ padding: 2, width: "100%" }}>
          <TextField
            required
            id="firstname"
            label="First name"
            variant="standard"
            fullWidth={true}
            name="firstname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ padding: 2, width: "100%" }}>
          <TextField
            required
            id="lastname"
            label="Last name"
            variant="standard"
            fullWidth={true}
            name="firstname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ padding: 2, width: "100%" }}>
          <TextField
            required
            id="username"
            label="Username"
            placeholder="Username"
            variant="standard"
            fullWidth={true}
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ padding: 2, width: "100%" }}>
          <TextField
            required
            id="email"
            label="Email"
            placeholder="Your email"
            variant="standard"
            fullWidth={true}
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <FormControl sx={{ paddingX: 2, paddingY: 0.1, width: "100%" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Your Password
          </InputLabel>
          <Input
            required
            id="password1"
            placeholder="Your password"
            fullWidth={true}
            name="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            type={showPassword1 ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  edge="end"
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ paddingX: 2, paddingY: 0.1, width: "100%" }}>
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            type={showPassword2 ? "text" : "password"}
            required
            id="password2"
            placeholder="Your password"
            fullWidth={true}
            name="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "Playfair",
                fontWeight: 700,
                color: "#383535",
                textDecoration: "none",
                textAlign: "center",
                padding: "2px",
              }}
            >
              Upload profile picture
            </Typography>
            <IconButton
              sx={{ color: "#1C7054", padding: "2px" }}
              aria-label="upload picture"
              component="label"
            >
              <input
                ref={profilePicInputRef}
                hidden
                accept="image/*"
                type="file"
                id="profilepic"
                name="profilepic"
                onChange={(e) => handleChangePhoto(e)}
              />
              <PhotoCamera />
            </IconButton>
            {profilepicURL && profilepic && (
              <IconButton onClick={handleRemovePhoto}>
                <ClearIcon />
              </IconButton>
            )}
          </Box>
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 120, height: 120 }}
            src={profilepicURL}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            data-cy="submit"
          >
            Register
          </Button>

          <Box
            height={"4rem"}
            display="flex"
            alignItems="center"
            padding="16px"
          >
            {errorMessage !== "" && (
              <Typography
                sx={{
                  display: { md: "flex" },
                  fontFamily: "Playfair",
                  fontWeight: 700,
                  color: "#dd0426",
                  textDecoration: "none",
                  margin: "auto",
                  fontSize: "0.8rem",
                }}
                data-cy="error-msg"
              >
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: "Playfair",
            fontWeight: 700,
            textDecoration: "none",
            alignText: "center",
            fontSize: "0.8rem",
          }}
        >
          By creating an account, you give your consent for us to process your
          personal data according to GDPR laws.
        </Typography>
      </Box>
    </Box>
  );
}
