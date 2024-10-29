import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import Index from './pages/index/Index.tsx';
import Home from './pages/home/Home.tsx';
import Login from './pages/login/Login.tsx';
import SignUp from './pages/sign-up/SignUp.tsx';
import Auth from './pages/auth/Auth.tsx';
import About from './pages/about/About.tsx';
import Products from './components/Products/Products.tsx';
import DashBoard from './pages/DashBoard/DashBoard.tsx';
import Favorite from './components/Favorite/Favorite.tsx';
import OrderLists from './components/OrderLists/OrderLists.tsx';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';
import CreateProduct from './pages/CreateProduct/CreateProduct.tsx';
import EditProduct from './pages/EditProduct/EditProduct.tsx';
import { ThemeContextProvider } from './context/ThemeContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Index />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: '',
            element: <DashBoard />,
            children: [
              {
                path: 'products',
                element: <Products />
              },
              {
                path: 'favorite',
                element: <Favorite />
              },
              {
                path: 'orderlists',
                element: <OrderLists />
              },
              {
                path: 'create',
                element: <CreateProduct />
              },
              {
                path: 'edit/:id',
                element: <EditProduct />
              }
            ]
          }
        ]
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: "",
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>
      <ThemeContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeContextProvider>
    </AuthProvider>
  </StrictMode>,
);