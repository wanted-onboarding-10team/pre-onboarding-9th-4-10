import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from 'pages/MainPage';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
        <MainPage />
        <ReactQueryDevtools initialIsOpen={true} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
