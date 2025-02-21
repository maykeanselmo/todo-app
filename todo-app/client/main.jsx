import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';

import { createBrowserRouter, RouterProvider} from 'react-router-dom'; 
import { Welcome } from '../imports/ui/routes/Welcome';
import {TasksPage} from '../imports/ui/routes/TasksPage';

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
  ]);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
