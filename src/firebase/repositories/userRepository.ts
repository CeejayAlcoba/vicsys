import { IUser, IUserLogin } from "../../interfaces/firebase/IUser";
import genericRepository from "./genericRepository";

export default function userRepository() {
  const _genericRepository = genericRepository<IUser>("users");
  const validateEmailAndPassword = async (data: IUserLogin) => {
    const { email, password } = data;
    const users = await _genericRepository.getAll();
    return users.find((c) => c.email == email && c.password == password);
  };
  return { ..._genericRepository, validateEmailAndPassword };
}
