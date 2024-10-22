import { onAuthStateChanged } from "firebase/auth";
import { INonTechUser, INonTechUserPublic } from "../../interfaces/firebase/INonTechUser";
import nonTechUserRepository from "../repositories/nonTechUserRepository";
import { auth } from "../firebaseConfig";

export default function nonTechUserService() {
  const _nonTechUserRepository = nonTechUserRepository();

  const getAll = async () => {
    console.log(_nonTechUserRepository.getAll());
    return await _nonTechUserRepository.getAll();
  };

  const add = async (data: INonTechUser ) => {
    return await _nonTechUserRepository.add(data);
  }

  const getById = async (id: string) => {
    return await _nonTechUserRepository.getById(id);
  };

  const update = async (id: string, data: INonTechUser) => {
    return await _nonTechUserRepository.update(id, data);
  };
  const deleteById = async (id: string) => {
    await _nonTechUserRepository.deleteById(id);
  };
  const getUserLocalStorage = (): INonTechUserPublic | null => {
    const nontechuser = localStorage.getItem("nontechusers");
    return nontechuser ? (JSON.parse(nontechuser) as INonTechUserPublic) : null;
  };
  const getUserLoggedIn = async (): Promise<INonTechUserPublic | null> => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (nonTechUser) => {
        if (nonTechUser) {
          const nonTechUsers = await _nonTechUserRepository.getAll();
          const findNonTechUser = nonTechUsers.find((c) => c.id === nonTechUser.uid);
          resolve(findNonTechUser as INonTechUserPublic);
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
    add,
    update,
    deleteById,
  };
}
