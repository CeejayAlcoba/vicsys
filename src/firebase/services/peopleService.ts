import { IPeople, IPeoplePublic } from "../../interfaces/firebase/IPeople";
import peopleRepository from "../repositories/peopleRepository";

export default function peopleService() {
  const _peopleRepository = peopleRepository();

  const getAll = async () => {
    console.log(_peopleRepository.getAll());
    return await _peopleRepository.getAll();
  };

  const add = async (data: IPeople ) => {
    return await _peopleRepository.add(data);
  }

  const getById = async (id: string) => {
    return await _peopleRepository.getById(id);
  };

  const update = async (id: string, data: IPeople) => {
    return await _peopleRepository.update(id, data);
  };
  const deleteById = async (id: string) => {
    await _peopleRepository.deleteById(id);
  };
  const getUserLocalStorage = (): IPeoplePublic | null => {
    const people = localStorage.getItem("peoplelist");
    return people ? (JSON.parse(people) as IPeoplePublic) : null;
  };
 
  return {
    getUserLocalStorage,
    getAll,
    getById,
    add,
    update,
    deleteById,
  };
}
