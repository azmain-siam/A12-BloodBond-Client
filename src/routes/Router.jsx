import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import DonationRequests from "../pages/DonationRequests";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Fundings from "../pages/Fundings";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../components/Dashboard/DashboardHome";
import Users from "../components/Dashboard/Users";
import Profile from "../components/Dashboard/Profile";
import Details from "../pages/Details";
import MyRequests from "../components/Dashboard/MyRequests";
import CreateRequest from "../components/Dashboard/CreateRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/fundings",
        element: (
          <PrivateRoute>
            <Fundings />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyRequests />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateRequest />,
      },
    ],
  },
]);

export default router;
