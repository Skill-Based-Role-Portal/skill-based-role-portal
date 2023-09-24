import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Main from './views/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Main name={'Home'} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
