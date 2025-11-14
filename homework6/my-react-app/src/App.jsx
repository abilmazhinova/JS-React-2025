
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import SomethingList from './pages/SomethingList';
import SomethingDetails from './pages/SomethingDetails';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // содержит только роутинг 
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/items', element: <SomethingList /> },
      { path: '/items/:id', element: <SomethingDetails /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}