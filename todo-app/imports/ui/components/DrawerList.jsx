
import React, {} from 'react';
import { Box,  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Fade, Avatar, Typography } from '@mui/material';
import { Home as HomeIcon, AccountCircle as AccountCircleIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { UserResumeCard } from './UserResumeCard';


export const DrawerList = ({ toggleDrawer, handleWelcome, logout, handleProfile}) => (
    <Box
      sx={{
        width: 280,
        height: '100%',
        backgroundColor: '#1C1C1C',
        color: '#E0E0E0',
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <UserResumeCard />
      
      <List sx={{
            backgroundColor: '#1C1C1C', 
          }} >
        {[ 
          { text: 'Início', icon: <HomeIcon />, handle: handleWelcome },
          { text: 'Perfil', icon: <AccountCircleIcon />, handle: handleProfile },
        ].map(({ text, icon, handle }) => (
          <ListItem key={text} disablePadding sx={{
            backgroundColor: '#1C1C1C', 
          }}>
            <ListItemButton onClick={handle}
              sx={{
                backgroundColor: '#1C1C1C', 
                borderRadius: '6px',
                marginBottom: '8px',
                transition: 'background 0.3s ease-in-out',
                '&:hover': { backgroundColor: '#4C4C4C' },
              }}
            >
              <ListItemIcon sx={{ color: '#E0E0E0' }}>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{ color: '#E0E0E0', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ backgroundColor: '#444', marginY: 2 }} />
      
      <List sx={{
            backgroundColor: '#1C1C1C', 
          }}  >
        <ListItem disablePadding sx={{
            backgroundColor: '#1C1C1C', 
          }}>
          <ListItemButton onClick={logout}
            sx={{
              backgroundColor: '#1C1C1C',
              borderRadius: '6px',
              '&:hover': { backgroundColor: '#4C4C4C' },
            }}
          >
            <ListItemIcon sx={{ color: '#E57373' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" sx={{ color: '#E57373', fontWeight: 500 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  