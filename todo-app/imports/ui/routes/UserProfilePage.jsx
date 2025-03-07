import * as React from "react";
import "./UserProfilePage.css"; 
import { Profile } from "../components/Profile.jsx";
import { useTracker } from 'meteor/react-meteor-data';

export const UserProfilePage = () => {
 
  const user = useTracker(() => Meteor.user());

  return (
    <div className="profile-container">
       <div>
             {user ? (
                <div>
                  
                    <Profile/>
                </div>
            )
            : (
                <div>
                    <h1>Faça login!</h1>
                    
                </div>
            )
            }
             
           </div>
      
    </div>
  );
};