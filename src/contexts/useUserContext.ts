import { createContext, useContext } from "react";
import { IUserPublic } from "../interfaces/firebase/IUser";

export const UserContext = createContext<null | {
  user: IUserPublic | null;
  setUser: React.Dispatch<React.SetStateAction<IUserPublic | null>>;
}>(null);

export default function useUserContext() {
  const user = useContext(UserContext);
  if (!user) throw new Error("context must not empty");
  return user;
}
