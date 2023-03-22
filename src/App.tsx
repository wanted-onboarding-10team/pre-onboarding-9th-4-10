import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import router from 'router';
import GlobalStyle from 'styles/GlobalStyle';
import GlobalFont from 'styles/GlobalFont';

const App = () => {
  const queryclient = new QueryClient();

  return (
    <QueryClientProvider client={queryclient}>
      <GlobalFont />
      <GlobalStyle />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
