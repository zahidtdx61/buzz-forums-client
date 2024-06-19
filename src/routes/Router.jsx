import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout/MainLayout";
import AddPost from "../pages/AddPost/AddPost";
import CommentsList from "../pages/CommentsList/CommentsList";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import JoinUs from "../pages/JoinUs/JoinUs";
import MakeAnnouncement from "../pages/MakeAnnouncement/MakeAnnouncement";
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import Membership from "../pages/Membership/Membership";
import MyPosts from "../pages/MyPosts/MyPosts";
import MyProfile from "../pages/MyProfile/MyProfile";
import PostDetails from "../pages/PostDetails/PostDetails";
import ReportedComments from "../pages/ReportedComments/ReportedComments";
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
      {
        path: "/membership",
        element: (
          <PrivateRoutes>
            <Membership />
          </PrivateRoutes>
        ),
      },
      {
        path: "/post/:postId",
        element: <PostDetails />,
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
      {
        path: "comments/:postId",
        element: <CommentsList />,
      },
      {
        path: "reported-comments",
        element: <ReportedComments />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
