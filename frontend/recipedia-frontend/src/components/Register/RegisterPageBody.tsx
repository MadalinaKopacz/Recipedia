import { Box } from "@mui/material";
import RegisterForm from "./RegisterForm";

export default function RegisterPageBody() {
  return (
    <>
      <Box
        display="flex"
        sx={{
          mt: "5rem",
        }}
        justifyContent="center"
        alignContent="center"
      >
        <img
          src="/media/illustration-register.svg"
          alt="Logo Recipedia"
          height="500"
          className="desktop-only"
          style={{
            marginTop: "10rem",
            marginRight: "-5rem",
            marginLeft: "10vw",
            zIndex: 1,
            width: "40vw",
            maxWidth: 407,
          }}
        />
        <RegisterForm />
      </Box>
    </>
  );
}
