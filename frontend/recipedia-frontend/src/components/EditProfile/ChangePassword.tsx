import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useContext, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../App";

export default function ChangePassword() {
  const [open, setOpen] = React.useState(false);
  const [old_password, setOldPassword] = useState<string>("");
  const [new_password1, setNewPassword1] = useState<string>("");
  const [new_password2, setNewPassword2] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorMessage1, setErrorMessage1] = useState<string>("");
  const [errorMessage2, setErrorMessage2] = useState<string>("");
  const [errorMessage3, setErrorMessage3] = useState<string>("");

  const [error1, setError1] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [error3, setError3] = useState<boolean>(false);

  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [showPassword3, setShowPassword3] = React.useState(false);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickShowPassword3 = () => setShowPassword3((show) => !show);

  const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
  const context = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setOldPassword("");
    setNewPassword1("");
    setNewPassword2("");
    setErrorMessage1("");
    setError1(false);

    setErrorMessage2("");
    setError2(false);

    setErrorMessage3("");
    setError3(false);

    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!old_password) {
      setErrorMessage1("This field is required.");
      setError1(true);
      return;
    }
    if (!new_password1) {
      setErrorMessage2("This field is required.");
      setError2(true);
      return;
    }
    if (!new_password2) {
      setErrorMessage3("This field is required.");
      setError3(true);
      return;
    }
    if (new_password1 !== new_password2) {
      setErrorMessage("New passwords does not match.");
      return;
    } else if (!passwordRegex.test(new_password1)) {
      setErrorMessage(
        "The password should have minimum 8 characters, at least one uppercase letter, one lowercase letter and one number."
      );
      return;
    }
    let form_data = new FormData();
    form_data.append("old_password", old_password);
    form_data.append("new_password1", new_password1);
    form_data.append("new_password2", new_password2);

    axios
      .post("http://localhost:8000/user/change_password/", form_data, {
        headers: {
          Authorization: context.token,
        },
      })
      .then((response) => {
        setErrorMessage("");
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
        setErrorMessage1("");
        setError1(false);

        setErrorMessage2("");
        setError2(false);

        setErrorMessage3("");
        setError3(false);

        setOpen(false);
        context.refreshUser();
        window.location.reload();
      })
      .catch((errors) => {
        setErrorMessage(errors.response.data.message);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: "55ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Old Password
            </InputLabel>
            <Input
              error={error1}
              autoFocus
              required
              margin="dense"
              id="old_pass"
              fullWidth
              value={old_password}
              onChange={(e) => {
                setErrorMessage1("");
                setError1(false);
                setOldPassword(e.target.value);
              }}
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

          <Box display="flex" alignItems="center">
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
            >
              {errorMessage1 || <br />}
            </Typography>
          </Box>
          <FormControl sx={{ m: 1, width: "55ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              New Password
            </InputLabel>
            <Input
              error={error2}
              autoFocus
              required
              margin="dense"
              id="new_pass1"
              fullWidth
              value={new_password1}
              onChange={(e) => {
                setErrorMessage2("");
                setError2(false);
                setNewPassword1(e.target.value);
              }}
              type={showPassword2 ? "text" : "password"}
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
          <Box display="flex" alignItems="center">
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
            >
              {errorMessage2 || <br />}
            </Typography>
          </Box>
          <FormControl sx={{ m: 1, width: "55ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Confirm Password
            </InputLabel>
            <Input
              error={error3}
              autoFocus
              required
              margin="dense"
              id="new_pass2"
              fullWidth
              value={new_password2}
              onChange={(e) => {
                setErrorMessage3("");
                setError3(false);
                setNewPassword2(e.target.value);
              }}
              type={showPassword3 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword3}
                    edge="end"
                  >
                    {showPassword3 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Box display="flex" alignItems="center">
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
            >
              {errorMessage3 || <br />}
            </Typography>
          </Box>
          <Box sx={{ m: 1, width: "55ch" }} display="flex" alignItems="center">
            <Typography
              sx={{
                display: { md: "flex" },
                fontFamily: "Playfair",
                fontWeight: 600,
                color: "#dd0426",
                textDecoration: "none",
                margin: "auto",
                fontSize: "0.8rem",
              }}
            >
              {errorMessage || <br />}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
