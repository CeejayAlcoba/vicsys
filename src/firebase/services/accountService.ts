import useUserContext from "../../contexts/useUserContext";
import { IUserLogin } from "../../interfaces/firebase/IUser";
import userRepository from "../repositories/userRepository";

export default function accountService() {
  const _userRepository = userRepository();
  const { setUser } = useUserContext();
  const login = async (data: IUserLogin) => {
    const user = await _userRepository.validateEmailAndPassword(data);
    if (!user) throw new Error("Invalid email and password");

    const { password, ...rest } = user;
    localStorage.setItem("user", JSON.stringify(rest));
    setUser(rest);
    return rest;
  };

  const logout = async () => {
    localStorage.clear();
    setUser(null);
  };

  return { login, logout };
}
