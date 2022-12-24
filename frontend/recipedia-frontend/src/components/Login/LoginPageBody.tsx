import { Box, Button, Card, Grid, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

export default function LoginPageBody() {
    return (
        <>
            <Box
                display="flex"
                sx={{
                    mt: "10rem",
                }}
                justifyContent="center"
                alignContent="center"
            >
                <img
                    src="media/big-logo.svg"
                    alt="Logo Recipedia"
                    height="500"
                    style={{
                        display: "block",
                        marginRight: "-10rem",
                        marginLeft: "15vw",
                        zIndex: 1,
                        width: "40vw",
                        maxWidth: 407
                    }}
                />
                <LoginForm/>
            </Box>

        </>
    );
}
