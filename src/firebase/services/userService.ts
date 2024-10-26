import { onAuthStateChanged } from "firebase/auth";
import { IUserDetails, IUserPublic } from "../../interfaces/firebase/IUser";
import userRepository from "../repositories/userRepository";
import { auth } from "../firebaseConfig";
import PeopleRepository from "../repositories/peopleRepository";
import accountRepository from "../repositories/accountRepository";

export default function userService() {
  const _accountRepository = accountRepository();
  const _userRepository = userRepository();
  const _peopleRepository = PeopleRepository();
  const getAll = async () => {
    return await _userRepository.getAll();
  };
  const getById = async (id: string) => {
    return await _userRepository.getById(id);
  };
  const update = async (id: string, data: IUserPublic) => {
    return await _userRepository.update(id, data);
  };
  const deleteById = async (id: string) => {
    await _userRepository.deleteById(id);
  };
  const getUserLocalStorage = (): IUserPublic | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as IUserPublic) : null;
  };
  const getUserLoggedIn = async (): Promise<IUserDetails | null> => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        const provider = await _accountRepository.getUserProvider();
        if (user && provider) {
          resolve({ ...user, provider: provider });
        } else {
          resolve(null);
        }
      });
    });
  };
  const getTotalUsers = async () => {
    const users = await _userRepository.getAll();
    const peoples = await _peopleRepository.getAll();
    return users.length + peoples.length;
  };
  const getByEmail = async (email: string) => {
    return await _userRepository.getUserByEmail(email);
  };
  const add = async (user: IUserPublic, uid: string) => {
    return await _userRepository.add(user, uid);
  };

  return {
    add,
    getByEmail,
    getTotalUsers,
    getUserLoggedIn,
    getUserLocalStorage,
    getAll,
    getById,
    update,
    deleteById,
  };
}
