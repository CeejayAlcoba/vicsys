import { INonTechUser } from "../../interfaces/firebase/INonTechUser";
import genericRepository from "./genericRepository";

export default function nonTechUserRepository() {
  const _genericRepository = genericRepository<INonTechUser>("nontechusers");

  const isEmailExisted = async (email: string) => {
    const nontechusers = await _genericRepository.getAll();
    return !!nontechusers.find((u) => u.email == email);
  };

  return {
    isEmailExisted,
    ..._genericRepository,
  };
}
