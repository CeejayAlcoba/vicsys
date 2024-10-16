import { IUser, IUserPublic } from "../../interfaces/firebase/IUser";
import userRepository from "../repositories/userRepository";

export default function userService() {
  const _userRepository = userRepository();

  const add = async (data: IUser) => {
    const isEmailExisted = await _userRepository.isEmailExisted(data.email);
    if (isEmailExisted)
      throw new Error(
        "Email already in use. Try logging in or use a different email to sign up."
      );

    await _userRepository.add(data);
  };

  const getAll = async () => {
    console.log(_userRepository.getAll());
    return await _userRepository.getAll();
  };

  const getById = async (id: string) => {
    return await _userRepository.getById(id);
  };

  const update = async (id: string, data: IUser) => {
    return await _userRepository.update(id, data);
  };
  const deleteById = async (id: string) => {
    await _userRepository.deleteById(id);
  };
  const getUserLocalStorage = (): IUserPublic | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as IUserPublic) : null;
  };

  return { getUserLocalStorage, add, getAll, getById, update, deleteById };
}
