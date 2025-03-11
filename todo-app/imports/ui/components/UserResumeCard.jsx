import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { Meteor } from "meteor/meteor";

export const UserResumeCard = () =>{
    const [userData, setUserData] = useState({}); 
    useEffect(() => {
        Meteor.call('userProfile.get', (error, result) => {
            if (error) {
             console.error('Erro ao buscar perfil:', error);
           } else {
             setUserData({
               name: result.name,
               email: result.email,
               photo: result.photo, 
             });
             console.log('Perfil do usuário:', result);
           }
         });
    }, []);

    return(
        <>
        
            <Box sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', padding: '16px 0' }}>
                <Avatar sx={{ width: 50, height: 50, marginRight: 2 }} src={userData?.photo || '/default-avatar.png'} />
                <Box>
                    <Typography variant="body1" sx={{ color: '#E0E0E0', fontWeight: 500 }}>
                    {userData?.name || 'Nome do Usuário'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    {userData?.email || 'email@dominio.com'}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}