import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './Root';
import { Details, loader as detailsLoader, action as detailsAction } from './Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '',
        element: <a href='/details'>Go to the details page</a>,
      },
      {
        path: 'details',
        element: <Details></Details>,
        loader: detailsLoader,
        action: detailsAction,
      }
    ]
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
