import { Typography, FormControl, TextField, Box, Button, Avatar, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [profilepic, setProfilePic] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChangePhoto = (e: any) => {
        setProfilePic(URL.createObjectURL(e.target.files[0]));
        console.log(profilepic);
    }
  

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        axios
            .post("http://localhost:8000/user/register/",
                {
                    firstname: fname,
                    lastname: lname,
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2,
                    profilepic: profilepic
                })
            .then((response) => {
                localStorage.setItem('userToken', response.data.token);
                console.log(response);
                alert("Logged in");
            })
            .catch((errors) => {
                setErrorMessage(errors.response.data.message);
                console.log(errors);
            }
            );
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
                        variant="outlined"
                        fullWidth={true}
                        name="firstname"
                        value={fname}
                        onChange={e => setFname(e.target.value)}
                    />
                </FormControl >
                <FormControl sx={{ padding: 2, width: "100%" }}>
                    <TextField
                        required
                        id="lastname"
                        label="Last name"
                        variant="outlined"
                        fullWidth={true}
                        name="firstname"
                        value={lname}
                        onChange={e => setLname(e.target.value)}
                    />
                </FormControl >
                <FormControl sx={{ padding: 2, width: "100%" }}>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        placeholder="Username"
                        variant="outlined"
                        fullWidth={true}
                        value={username}
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormControl >
                <FormControl sx={{ padding: 2, width: "100%" }}>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        placeholder="Your email"
                        variant="outlined"
                        fullWidth={true}
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormControl >
                <FormControl sx={{ padding: 2, width: "100%" }}>
                    <TextField
                        required
                        id="password1"
                        type="password"
                        label="Password1"
                        placeholder="Your password"
                        variant="outlined"
                        fullWidth={true}
                        name="password1"
                        value={password1}
                        onChange={e => setPassword1(e.target.value)}
                    />
                </FormControl >
                <FormControl sx={{ padding: 2, width: "100%" }}>
                    <TextField
                        required
                        id="password2"
                        type="password"
                        label="Password2"
                        placeholder="Your password"
                        variant="outlined"
                        fullWidth={true}
                        name="password2"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                </FormControl >
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ marginBottom: 2, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Typography sx={{
                            mr: 2,
                            display: { md: "flex" },
                            fontFamily: "Playfair",
                            fontWeight: 700,
                            color: "#383535",
                            textDecoration: "none",
                            textAlign: "center",
                            padding: "2px"
                        }}
                        >
                            Upload profile picture
                        </Typography>
                        <IconButton sx={{ color: "#1C7054", padding: "2px" }} aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file"
                                id="profilepic"
                                name="profilepic"
                                onChange={e => handleChangePhoto(e)}
                            />
                            <PhotoCamera />
                        </IconButton>
                    </Box>
                    <Avatar
                        alt="Remy Sharp"
                        sx={{ width: 120, height: 120 }}
                        src={profilepic}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column-reverse", justifyContent: "center", alignItems: "center" }}>
                    <Button
                        type="submit"
                        sx={{
                            my: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
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
                        Register
                    </Button>
                </Box>
            </Box>

        </Box>

    );
}



