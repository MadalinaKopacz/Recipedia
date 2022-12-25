import { Box } from "@mui/material";
import StartPageHeader from "../components/Headers/StartPageHeader";
import RegisterPageBody from "../components/Register/RegisterPageBody";

const RegisterPage = () => {
  return (
    <>
      <StartPageHeader />
      <RegisterPageBody />
      <Box sx={{height: "5rem"}}></Box>
    </>
  );
};

export default RegisterPage;
