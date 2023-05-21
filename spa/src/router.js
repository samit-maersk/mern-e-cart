import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import App from "./App";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
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
            path: "*",
            element: <NotFound />,
        }
      ]
    }
  ]);

  export default router;