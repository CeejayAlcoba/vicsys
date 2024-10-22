import { IPeople } from "../../interfaces/firebase/IPeople";
import genericRepository from "./genericRepository";

export default function PeopleRepository() {
  const _genericRepository = genericRepository<IPeople>("peoplelist");

  return {
    ..._genericRepository,
  };
}
