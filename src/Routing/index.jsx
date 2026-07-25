import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import ListProducts from "../Pages/Dashboard/Product/List";
import ListUsers from "../Pages/Dashboard/User/List";
import DashboardHome from "../Pages/Dashboard/Home";
import DashboardLayout from "../Pages/Dashboard/Layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "products",
        element: <ListProducts />,
      },
      {
        path: "users",
        element: <ListUsers />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login/:userType",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
