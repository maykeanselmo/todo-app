import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from "react-router-dom";
import { TemporaryDrawer } from "../components/drawer/TemporaryDrawer.jsx";
import { DashBoard } from "../components/dashBoard/DashBoard.jsx";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { LoginRequired } from "../components/login/LoginRequired.jsx";

export const Welcome = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          mt: 4, 
          borderRadius: 2, 
          backgroundColor: "#F8F8FF" 
        }}
      >
        {user ? (
          <Box textAlign="center">
            <TemporaryDrawer />
            <Typography variant="h4" gutterBottom>
              Bem-vindo, {user.username}!
            </Typography>
            <DashBoard />
            <Button 
              variant="contained" 
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={handleLogout} 
              sx={{ mt: 2 }}
            >
              Sair
            </Button>
          </Box>
        ) : (
          <LoginRequired />
        )}
      </Paper>
    </Container>
  );
};
