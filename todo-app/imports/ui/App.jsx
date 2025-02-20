import { Meteor } from 'meteor/meteor';
import React, {Fragment} from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';

export const App = () => {

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  return (
    <div className='main'>
      {user? (
        <div>
          <p>Bem-vindo, {user.username}</p>
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <div>
          <LoginForm/>
        </div>
      )}
    </div>
  )
};
