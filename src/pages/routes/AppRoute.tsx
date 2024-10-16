import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LogIn from "../auth/login/LogIn";
import SignUp from "../auth/signup/SignUp";
import UserPage from "../private/user/UserPage";
import Main from "../layouts/Main";
import useUserContext from "../../contexts/useUserContext";
import Dashboard from "../private/dashboard/Dashboard";

export default function AppRoute() {
  const { user } = useUserContext();
  const router = createBrowserRouter([
    {
      children: [
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      element: user ? <Main /> : <Navigate to="/login" />,
      children: [
        {
          path: "user",
          element: <UserPage />,
        },
        {
          path: "/",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
