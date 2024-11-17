import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRoute from "./pages/routes/AppRoute";
import { UserContext } from "./contexts/useUserContext";
import { useEffect, useState } from "react";
import userService from "./firebase/services/userService";
import PageLoading from "./components/PageLoading";
import { IUserDetails } from "./interfaces/firebase/IUser";
import { messaging } from "./firebase/firebaseConfig";
import { getToken } from "firebase/messaging";

const queryClient = new QueryClient();
function App() {
  const _userService = userService();
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const getUserLoggedIn = async () => {
    const newUser = await _userService.getUserLoggedIn();
    setUser(newUser);
    setLoading(false);
  };
  async function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const token = getToken(messaging, {
          vapidKey:
            "BLkKHqJqyq246VxcyKz702XVwupcBRlU3iNi_6eSESeogln571ROZXnQpyixERlnf9nyRviYeHNlNMp1uYHY-5o",
        });
        console.log("Token generated : ", token);
        return token;
      } else if (permission === "denied") {
        console.log(permission);
        // alert("You denied for the notification");
      }
    });
  }

  useEffect(() => {
    getUserLoggedIn();
    requestPermission();
  }, []);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoute />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
