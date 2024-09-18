import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import Page404 from './pages/Page404';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OnlyNotLogged from './ProtectedRoutes/OnlyNotLogged';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <PostPage />,
      },
      {
        path: '/login',
        element: <OnlyNotLogged />, // Usa o OnlyNotLogged como wrapper
        children: [
          {
            path: '',
            element: <Login />,
          },
        ],
      },
      {
        path: '/register',
        element: <OnlyNotLogged />, // Usa o OnlyNotLogged como wrapper
        children: [
          {
            path: '',
            element: <Register />,
          },
        ],
      },
      // Página para 404
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
