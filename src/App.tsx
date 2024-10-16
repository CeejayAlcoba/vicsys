import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRoute from "./pages/routes/AppRoute";
import { UserContext } from "./contexts/useUserContext";
import { useState } from "react";
import { IUserPublic } from "./interfaces/firebase/IUser";
import userService from "./firebase/services/userService";

const queryClient = new QueryClient();
function App() {
  const _userService = userService();
  const [user, setUser] = useState<IUserPublic | null>(
    _userService.getUserLocalStorage()
  );
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoute />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
