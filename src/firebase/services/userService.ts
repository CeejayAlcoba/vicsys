import { onAuthStateChanged } from "firebase/auth";
import { IUser, IUserPublic } from "../../interfaces/firebase/IUser";
import userRepository from "../repositories/userRepository";
import { auth } from "../firebaseConfig";

export default function userService() {
  const _userRepository = userRepository();

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
  const getUserLoggedIn = async (): Promise<IUserPublic | null> => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const users = await _userRepository.getAll();
          const foundUser = users.find((c) => c.id === user.uid);
          resolve(foundUser as IUserPublic);
        } else {
          resolve(null);
        }
      });
    });
  };

  return {
    getUserLoggedIn,
    getUserLocalStorage,
    getAll,
    getById,
    update,
    deleteById,
  };
}
