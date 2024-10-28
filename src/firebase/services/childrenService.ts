import childrenRepository from "../repositories/childrenRepository";
import IChild from "../../interfaces/firebase/IChild";

export default function childrenService() {
  const _childrenRepository = childrenRepository();

  const getAll = async () => {
    return await _childrenRepository.getAll();
  };

  const addMany = async (userId: string, data: IChild[]) => {
    return await _childrenRepository.addMany(userId, data);
  };
  const getByUserId = async (userId: string) => {
    return await _childrenRepository.getByUserId(userId);
  };

  const getById = async (id: string) => {
    return await _childrenRepository.getById(id);
  };

  const update = async (id: string, data: IChild) => {
    return await _childrenRepository.update(id, data);
  };
  const updateManyByUserId = async (userId: string, data: IChild[]) => {
    await _childrenRepository.deleteManyByUserId(userId);
    return await _childrenRepository.addMany(userId, data);
  };
  const deleteById = async (id: string) => {
    await _childrenRepository.deleteById(id);
  };

  return {
    updateManyByUserId,
    getByUserId,
    getAll,
    getById,
    addMany,
    update,
    deleteById,
  };
}
