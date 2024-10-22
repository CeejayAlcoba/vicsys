import { IUser } from "../../interfaces/firebase/IUser";
import genericRepository from "./genericRepository";

export default function userRepository() {
  const _genericRepository = genericRepository<IUser>("users");

  const isEmailExisted = async (email: string) => {
    const users = await _genericRepository.getAll();
    return !!users.find((u) => u.email == email);
  };

  return {
    isEmailExisted,
    ..._genericRepository,
  };
}
