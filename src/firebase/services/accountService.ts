import useUserContext from "../../contexts/useUserContext";
import {
  IUser,
  IUserChangePassword,
  IUserLogin,
  IUserPublic,
} from "../../interfaces/firebase/IUser";
import { auth } from "../firebaseConfig";
import accountRepository from "../repositories/accountRepository";
import userRepository from "../repositories/userRepository";

export default function accountService() {
  const _accountRepository = accountRepository();
  const _userRepository = userRepository();
  const { setUser } = useUserContext();

  const signup = async (data: IUser) => {
    const { email } = data;
    await _accountRepository.emailVerification();
    const isEmailExisted = await _userRepository.isEmailExisted(email);
    if (isEmailExisted)
      throw new Error(
        "Email already in use. Try logging in or use a different email to sign up."
      );
    await _accountRepository.signup(data);
  };

  const getCurrentUser = async () => {
    return await _accountRepository.getCurrentUser();
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
  const isEmailVerified = (): boolean => {
    return _accountRepository.isEmailVerified();
  };

  const changePassword = async (data: IUserChangePassword) => {
    const { currentPassword, newPassword } = data;
    if (auth.currentUser?.email) {
      await login({
        email: auth.currentUser.email,
        password: currentPassword,
      })
        .then(async () => {
          await _accountRepository.changePassword(newPassword);
        })
        .catch(() => {
          throw new Error("Invalid current password.");
        });
    }
  };
  const profileUpdate = async (data: IUserPublic) => {
    try {
      await _accountRepository.profileUpdate(data);
    } catch (_e: any) {
      const e: Error = _e;
      throw new Error(e.message);
    }
  };
  const emailVerification = async () => {
    await _accountRepository.emailVerification();
  };

  return {
    getCurrentUser,
    emailVerification,
    signup,
    login,
    logout,
    changePassword,
    profileUpdate,
    isEmailVerified,
  };
}
