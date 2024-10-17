import useUserContext from "../../contexts/useUserContext";
import { IUser, IUserLogin } from "../../interfaces/firebase/IUser";
import accountRepository from "../repositories/accountRepository";
import userRepository from "../repositories/userRepository";

export default function accountService() {
  const _accountRepository = accountRepository();
  const _userRepository = userRepository();
  const { setUser } = useUserContext();

  const signup = async (data: IUser) => {
    const { email } = data;
    const isEmailExisted = await _userRepository.isEmailExisted(email);
    if (isEmailExisted)
      throw new Error(
        "Email already in use. Try logging in or use a different email to sign up."
      );
    await _accountRepository.signup(data);
  };

  const login = async (data: IUserLogin) => {
    const user = await _accountRepository.login(data);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = async () => {
    await _accountRepository.logout();
    setUser(null);
  };

  return { signup, login, logout };
}
