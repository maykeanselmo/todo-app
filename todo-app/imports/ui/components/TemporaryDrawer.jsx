import React, { useState} from 'react';
import { Drawer, IconButton, Fade } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Meteor } from "meteor/meteor";
import { DrawerList } from './DrawerList';

export const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);
  const navigate = useNavigate();


  const handleWelcome = () => {
    navigate('/welcome');
  }
  
  const logout = () => {
    Meteor.logout();
    navigate('/');
  } 
  
  const handleProfile = () => {
    navigate('/profile');
  } 

  return (
    <>
      <Fade in={true} timeout={800}>
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "#444",
            color: "white",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
            "&:hover": { backgroundColor: "#555" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Fade>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList 
          toggleDrawer={toggleDrawer} 
          handleWelcome={handleWelcome} 
          logout={logout} 
          handleProfile={handleProfile} 
        />
      </Drawer>
    </>
  );
};
