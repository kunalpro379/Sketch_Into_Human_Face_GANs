import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login'; // Assuming you have this

// Use type assertion to allow future flags
export const router = createBrowserRouter([
     {
          path: '/',
          element: <Dashboard />,
     },
     {
          path: '/login',
          element: <Login />,
     }
], {
     future: {
          // @ts-ignore -- These flags will be added in v7
          v7_startTransition: true,
          v7_relativeSplatPath: true
     }
}); 