import { doc, setDoc } from "firebase/firestore";
import { IUser, IUserPublic } from "../../interfaces/firebase/IUser";
import genericRepository from "./genericRepository";
import { db } from "../firebaseConfig";

export default function userRepository() {
  const _genericRepository = genericRepository<IUser>("users");

  const isEmailExisted = async (email: string) => {
    const users = await _genericRepository.getAll();
    return !!users.find((u) => u.email == email);
  };
  const getUserByEmail = async (email: string) => {
    const users = await _genericRepository.getAll();
    return users.find((u) => u.email == email);
  };
  const add = async (user: IUserPublic, uid: string) => {
    const { name, email, birthday } = user;
    return await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      birthday: birthday,
      userId: uid,
    });
  };
  return {
    ..._genericRepository,
    getUserByEmail,
    isEmailExisted,
    add,
  };
}
