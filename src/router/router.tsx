import { createBrowserRouter } from 'react-router-dom';
import mainLoader from 'router/loader/mainLoader';
import OrderListPage from 'pages/OrderListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <OrderListPage />,
    loader: mainLoader,
  },
]);
export default router;
