import { IPeople } from "../../interfaces/firebase/IPeople";
import genericRepository from "./genericRepository";

export default function PeopleRepository() {
  const _genericRepository = genericRepository<IPeople>("peoplelist");
  const getTotalPeoples = async () => {
    const peoples = await _genericRepository.getAll();
    return peoples.length;
  };
  return {
    getTotalPeoples,
    ..._genericRepository,
  };
}
