import { Typography, FormControl, TextField, Box, Button } from "@mui/material";
import axios from "axios";
import { debug } from "console";
import React from "react";
import { useNavigate } from "react-router-dom";


interface LoginFormState {
    username: string;
    password: string;
}

interface ComponentProps { }

export default class LoginForm extends React.Component<ComponentProps, LoginFormState>{
    constructor(props: {} | {}) {
        super(props);
        this.state = { username: "", password: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value } as unknown as LoginFormState)
    }
    
    handleSubmit(event: { preventDefault: () => void; }) {
        axios.post('http://localhost:8000/user/login/', this.state) 
        .then((response) => {
           if (response.data.status == "failed")
           {
               alert("Failed login");
           } else {
                alert("Logged in");
           }
        })
        .catch(errors => console.log(errors)) 

    }

    render() {
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
                    onSubmit={this.handleSubmit}
                >
                    <FormControl sx={{ padding: 2, width: "50%" }}>
                        <TextField
                            required
                            id="username"
                            label="Username/email"
                            placeholder="Your username/email"
                            variant="outlined"
                            fullWidth={true}
                            onChange={this.handleChange}
                            value={this.state.username}
                            name="username"
                        />
                    </FormControl >
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
                            onChange={this.handleChange}
                            value={this.state.password}
                            name="password"
                        />
                    </FormControl >

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
                        Login
                    </Button>
                </Box>

            </Box>

        );
    }
}


