import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRoute from "./pages/routes/AppRoute";
import { UserContext } from "./contexts/useUserContext";
import { useEffect, useState } from "react";
import { IUserPublic } from "./interfaces/firebase/IUser";
import userService from "./firebase/services/userService";
import PageLoading from "./components/PageLoading";

const queryClient = new QueryClient();
function App() {
  const _userService = userService();
  const [user, setUser] = useState<IUserPublic | null>(null);
  const [loading, setLoading] = useState(true);
  const getUserLoggedIn = async () => {
    const newUser = await _userService.getUserLoggedIn();
    setUser(newUser);
    setLoading(false);
  };

  useEffect(() => {
    getUserLoggedIn();
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
