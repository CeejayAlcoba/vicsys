import { INonTechUser } from "../../interfaces/firebase/INonTechUser";
import genericRepository from "./genericRepository";

export default function nonTechUserRepository() {
  const _genericRepository = genericRepository<INonTechUser>("nontechusers");
  return {
    ..._genericRepository,
  };
}
