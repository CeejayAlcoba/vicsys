import { INonTechUserPublic } from "../../interfaces/firebase/INonTechUser";
import childrenRepository from "../repositories/childrenRepository";
import IChild from "../../interfaces/firebase/IChild";

export default function childrenService() {
  const _childrenReository = childrenRepository();

  const getAll = async () => {
    return await _childrenReository.getAll();
  };

  const addMany = async (userId: string, data: IChild[]) => {
    data.map(async (child) => {
      await _childrenReository.add({ ...child, userId });
    });
    return data;
  };

  const getById = async (id: string) => {
    return await _childrenReository.getById(id);
  };

  const update = async (id: string, data: IChild) => {
    return await _childrenReository.update(id, data);
  };
  const deleteById = async (id: string) => {
    await _childrenReository.deleteById(id);
  };
  const getUserLocalStorage = (): INonTechUserPublic | null => {
    const nontechuser = localStorage.getItem("nontechusers");
    return nontechuser ? (JSON.parse(nontechuser) as INonTechUserPublic) : null;
  };

  return {
    getUserLocalStorage,
    getAll,
    getById,
    addMany,
    update,
    deleteById,
  };
}
