import * as React from "react";
import "./UserProfilePage.css"; 
import { Profile } from "../components/profile/Profile.jsx";
import { useTracker } from 'meteor/react-meteor-data';
import { TemporaryDrawer } from "../components/drawer/TemporaryDrawer.jsx";
import { useNavigate } from 'react-router-dom';

export const UserProfilePage = () => {
 
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
}
  return (
    <div className="profile-container">
       <div>
             {user ? (
                <div>
                    <div>
                      <TemporaryDrawer/> 
                    </div>
                  
                    <Profile/>
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
  );
};