import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import "../imports/api/tasksMethods"; 
import "../imports/api/userMethods"; 
import "../imports/api/userProfileMethods"; 
import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 
import { Welcome } from '../imports/ui/routes/Welcome';
import {TasksPage} from '../imports/ui/routes/TasksPage.jsx';
import {TaskDetails} from '../imports/ui/routes/TaskDetails.jsx';
import { UserProfilePage } from '../imports/ui/routes/UserProfilePage.jsx';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/welcome",
      element: <Welcome />,
    },
    {
      path: "/tasks",
      element: <TasksPage />,
    },
    {
      path: "/tasks/:taskId",
      element: <TaskDetails />,
    },
    {
      path: "/profile",
      element: <UserProfilePage />,
    }
  ]);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
