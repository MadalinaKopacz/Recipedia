import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Avatar, FormControl, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../App";

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilepic, setProfilePic] = useState<File>();
  const profilePicInputRef = useRef<HTMLInputElement>(null);
  const [profilepicURL, setProfilePicURL] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const context = useAuth();

  const emailRegex = new RegExp(
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(.[a-zA-Z](-?[a-zA-Z0-9])*)+$/
  );

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
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Email is incorrect.");
      return;
    }

    let form_data = new FormData();
    if (profilepic) {
      form_data.append("profile_pic", profilepic);
    }
    if (fname) {
      form_data.append("first_name", fname);
    }
    if (lname) {
      form_data.append("last_name", lname);
    }
    if (username) {
      form_data.append("username", username);
    }
    if (email) {
      form_data.append("email", email);
    }

    axios
      .post("http://localhost:8000/user/update_user/", form_data, {
        headers: {
          Authorization: context.token,
        },
      })
      .then((response) => {
        setErrorMessage("");
        setEmail("");
        setFname("");
        setProfilePic(undefined);
        setLname("");
        setUsername("");
        setProfilePicURL("");
        setOpen(false);
        context.refreshUser();
        window.location.reload();
      })
      .catch((errors) => {
        setErrorMessage(errors.response.data.message);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e: any) => {
    setEmail("");
    setFname("");
    setErrorMessage("");
    setProfilePic(undefined);
    setLname("");
    setUsername("");
    setProfilePicURL("");
    setOpen(false);
  };

  return (
    <div>
      <Button id="btn-edit-profile" variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} data-cy="dialog">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />

          <TextField
            margin="dense"
            id="lname"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleEmailChange}
          />
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
                <IconButton id="rmv-pic" onClick={handleRemovePhoto}>
                  <ClearIcon />
                </IconButton>
              )}
            </Box>
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={profilepicURL}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button id="btn-cancel" onClick={handleClose}>Cancel</Button>
          <Button id="btn-save" onClick={handleSubmit}>Done</Button>
        </DialogActions>
        <Box height={"1rem"} display="flex" alignItems="center" padding="10px">
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
      </Dialog>
    </div>
  );
}
