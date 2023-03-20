import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from 'styles';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyle />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
