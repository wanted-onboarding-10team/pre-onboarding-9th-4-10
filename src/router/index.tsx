import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import mainLoader from 'router/loader/mainLoader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    loader: mainLoader,
  },
]);

export default router;
