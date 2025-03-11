import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginRequired = () => {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate("/");
      };

    return (
        <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Faça login!
            </Typography>
            <Button 
              variant="contained" 
              style={{ backgroundColor: 'black', color: 'white' }}
              onClick={handleLogin} 
              sx={{ mt: 2 }}
            >
              Fazer login
            </Button>
          </Box>
    )
} 