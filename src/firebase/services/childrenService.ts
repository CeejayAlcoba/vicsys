import childrenRepository from "../repositories/childrenRepository";
import IChild, { ChildCategory } from "../../interfaces/firebase/IChild";
import IPieValue from "../../interfaces/components/IPieValue";

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
  const add = async (data: IChild, userId?: string) => {
    if (userId) return await _childrenRepository.add({ ...data, userId });
    return await _childrenRepository.add(data);
  };
  const getTotalChildren = async () => {
    const children = await _childrenRepository.getAll();
    return children.length;
  };

  const getChildrenCategoryPieChart = async (): Promise<IPieValue[]> => {
    const children = await _childrenRepository.getAll();
    const familyRoom = children.filter((c) => c.age >= 0 && c.age <= 3).length;
    const preschool = children.filter((c) => c.age >= 4 && c.age <= 6).length;
    const primary = children.filter((c) => c.age >= 7 && c.age <= 9).length;
    const preteens = children.filter((c) => c.age >= 10 && c.age <= 12).length;

    const result: IPieValue[] = [
      { type: ChildCategory.FamilyRoom, value: familyRoom },
      { type: ChildCategory.Preschool, value: preschool },
      { type: ChildCategory.Primary, value: primary },
      { type: ChildCategory.Preteens, value: preteens },
    ];

    return result;
  };

  return {
    getChildrenCategoryPieChart,
    getTotalChildren,
    updateManyByUserId,
    getByUserId,
    getAll,
    getById,
    addMany,
    update,
    deleteById,
    add,
  };
}
