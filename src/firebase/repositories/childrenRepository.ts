import IChild from "../../interfaces/firebase/IChild";
import genericRepository from "./genericRepository";

export default function childrenRepository() {
  const _genericRepository = genericRepository<IChild>("children");
  return {
    ..._genericRepository,
  };
}
