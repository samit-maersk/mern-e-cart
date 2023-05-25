import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import App from "./App";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "/category/:id",
          element: <Category />,
        },
        ,
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
            path: "*",
            element: <NotFound />,
        }
      ]
    }
  ]);

  export default router;