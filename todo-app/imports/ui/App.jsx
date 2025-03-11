import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { LoginForm } from './components/LoginForm.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

console.log("LoginForm:", LoginForm);

export const App = () => {

  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  useEffect(() => {
    if (user) {
      navigate('/welcome');
    }
  }, [user, navigate]);

  return user ? null : (
    <div className='main'>
      <LoginForm />
    </div>
  );
};
