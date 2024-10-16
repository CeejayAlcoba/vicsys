import { IUser, IUserPublic } from "../../interfaces/firebase/IUser";
import userRepository from "../repositories/userRepository";

export default function userService() {
  const _userRepository = userRepository();

  const add = async (data: IUser) => {
    _userRepository.add(data);
  };
  const getAll = async () => {
    console.log(_userRepository.getAll());
    return _userRepository.getAll();
  };

  const getById = async (id: string) => {
    return _userRepository.getById(id);
  };

  const update = async (id: string, data: IUser) => {
    return _userRepository.update(id, data);
  };
  const deleteById = async (id: string) => {
    _userRepository.deleteById(id);
  };
  const getUserLocalStorage = (): IUserPublic | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as IUserPublic) : null;
  };

  return { getUserLocalStorage, add, getAll, getById, update, deleteById };
}
