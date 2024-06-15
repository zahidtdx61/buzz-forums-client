import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AddPost from "../pages/AddPost/AddPost";
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";
import MyPosts from "../pages/MyPosts/MyPosts";
import MyProfile from "../pages/MyProfile/MyProfile";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/join-us",
    element: <JoinUs />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    errorElement: <h1>404 page Not Found</h1>,
    children: [
      {
        index: true,
        element: <MyProfile />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default router;
