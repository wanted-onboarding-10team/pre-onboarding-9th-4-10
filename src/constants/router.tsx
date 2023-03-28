import App from 'App';
import NotFound from 'pages/error/NotFound';
import OrderPage from 'pages/OrderPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <OrderPage />,
      },
    ],
  },
]);
