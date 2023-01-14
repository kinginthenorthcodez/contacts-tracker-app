import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import Contact from './routes/contact';
import EditContact from './routes/edit';
import Index from './routes';
import { loader as rootLoader } from './routes/root';
import { action as rootAction } from './routes/root';
import { loader as contactLoader } from './routes/contact';
import { loader as editLoader } from './routes/edit';
import { action as editAction } from './routes/edit';
import { action as deleteContactAction } from './routes/destroy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: deleteContactAction,
        errorElement: <h1>Something went wrong!</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
