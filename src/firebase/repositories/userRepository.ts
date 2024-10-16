import { IUser, IUserLogin } from "../../interfaces/firebase/IUser";
import genericRepository from "./genericRepository";

export default function userRepository() {
  const _genericRepository = genericRepository<IUser>("users");

  const isEmailExisted = async (email: string) => {
    const users = await _genericRepository.getAll();
    return !!users.find((u) => u.email == email);
  };

  const validateEmailAndPassword = async (data: IUserLogin) => {
    const { email, password } = data;
    const users = await _genericRepository.getAll();
    return users.find((c) => c.email == email && c.password == password);
  };

  return { isEmailExisted, validateEmailAndPassword, ..._genericRepository };
}
