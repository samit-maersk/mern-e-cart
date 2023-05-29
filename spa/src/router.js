import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import App from "./App";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Product from "./pages/product/Product";
import Cart from "./pages/Cart";
import CategoryLayout from "./pages/category/CategoryLayout";
import Categories from "./pages/category/Categories";
import Error from "./components/Error";
import Products from "./pages/product/Products";
import ProductLayout from "./pages/product/ProductLayout";
import ProductForm from "./pages/product/ProductForm";
import CategoryForm from "./pages/category/CategoryForm";
import Category from "./pages/category/Category";
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
              element: <Category />,
            },
            {
              path: "new",
              element: <CategoryForm />,
            }
          ],
        },
        {
          path: "/product",
          element: <ProductLayout />,
          errorElement: <Error />,
          children: [
            {
              path: "",
              element: <Products />,
            },
            {
              path: ":id",
              element: <Product />,
            },
            {
              path: "new",
              element: <ProductForm />,
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