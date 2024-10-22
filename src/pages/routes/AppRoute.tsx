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
import Test from "../private/test/Test";
import TicketQR from "../private/ticket/qr/TicketQR";
import EventPage from "../private/event/EventPage";
import AccountSettingPage from "../private/account-settings/AccountSettingPage";
import EmailVerificationPage from "../private/email-verification/EmailVerificationPage";

export default function AppRoute() {
  const { user } = useUserContext();
  const router = createBrowserRouter([
    {
      element: user && <Navigate to="/" />,
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
        {
          path: "/test",
          element: <Test />,
        },
        {
          path: "ticket-qr/:value",
          element: <TicketQR />,
        },
        {
          path: "event",
          element: <EventPage />,
        },
        {
          path: "account-settings",
          element: <AccountSettingPage />,
        },
        {
          path: "email-verification",
          element: <EmailVerificationPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
