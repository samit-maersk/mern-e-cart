import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import App from "./App";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Product from "./pages/product/Product";
import Cart from "./pages/Cart";
import CategoryDetails from "./pages/category/CategoryDetails";
import CategoryLayout from "./pages/category/CategoryLayout";
import CategoryNewUpdate from "./pages/category/CategoryNewUpdate";
import Categories from "./pages/category/Categories";
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
          element: <CategoryLayout />,
          errorElement: <Error />,
          children: [
            {
              path: "",
              element: <Categories />,
            },
            {
              path: ":id",
              element: <CategoryDetails />,
            },
            {
              path: "new",
              element: <CategoryNewUpdate />,
            }
          ],
        },
        {
          path: "/product",
          element: <Product />,
          children: [
            {
              path: ":id",
              element: <Product />,
            },
          ],
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