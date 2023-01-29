import { Box, Fab, Grid, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#EFE2D3",
  boxShadow: 24,
  paddingBottom: 2,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "15px",
};

export default function DeleteAccount() {
  const [open, setOpen] = React.useState(false);
  const context = useAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e: any) => {
    setOpen(false);
  };

  const handleDelete = (e: any) => {
    axios
      .delete("http://localhost:8000/user/delete_user/", {
        headers: {
          Authorization: context.token,
        },
      })
      .then((response) => {
        context.logout();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
    setOpen(false);
  };

  return (
    <div>
      <Button id="btn-del" variant="outlined" onClick={handleClickOpen}>
        Delete Account
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ pt: "1rem", fontFamily: "Playfair", color: "#383535" }}>
            Are you sure you want to delete your account?
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              mt: "5rem",
              left: 0,
              right: 0,
              marginTop: "",
              width: "100%"
            }}
          >
            <Button
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Playfair",
                color: "#383535",
                borderColor: "#383535",
                '&:hover': {
                  borderColor: '#dd0426',
                  color: '#dd0426',
                },
              }}
              onClick={handleDelete}
              variant="outlined"
              id="acc-del"
            >
              Yes
            </Button>
            <Button
              sx={{
                my: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Playfair",
                backgroundColor: "#383535",
                '&:hover': {
                  backgroundColor: '#dd0426',
                },
              }}
              onClick={handleClose}
              variant="contained"
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
