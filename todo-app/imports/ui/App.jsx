import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';

export const App = () => {

  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  const goToWelcome = () =>{
    navigate('/welcome')
  }

  return (
    <div className='main'>
      {user? (
        goToWelcome()
      ) : (
        <div>
          <LoginForm/>
        </div>
      )}
    </div>
  )
};
