import { RouterProvider } from 'react-router-dom';
import router from 'router';
import GlobalStyled from 'styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyled />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
