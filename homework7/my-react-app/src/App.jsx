import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import SomethingList from './pages/SomethingList';
import SomethingDetails from './pages/SomethingDetails';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/items', element: <SomethingList /> },
      { path: '/items/:id', element: <SomethingDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/profile', element: <Profile /> }, 
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}