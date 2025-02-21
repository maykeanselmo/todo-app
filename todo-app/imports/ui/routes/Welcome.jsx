import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';


export const Welcome = ()=> {
   const user = useTracker(() => Meteor.user());
   const navigate = useNavigate();
   
   const logout = () =>{
        Meteor.logout();
        navigate('/');
   } 

   const login = () =>{
    navigate('/');
} 

     return (
       <div className='main'>
         
           <div>
             {user ? (
                <div>
                    <h1>Bem-vindo, {user.username}!</h1>
                    <button onClick={logout}>Sair</button>
                </div>
            )
            : (
                <div>
                    <h1>Faça login!</h1>
                    <button onClick={login}>Fazer login</button>
                </div>
            )
            }
             
           </div>
         
       </div>
     )
}