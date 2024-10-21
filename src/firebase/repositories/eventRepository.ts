import { IEvent } from "../../interfaces/firebase/IEvent";
import genericRepository from "./genericRepository";

export default function eventRepository() {
  const _genericRepository = genericRepository<IEvent>("events");
  return { ..._genericRepository };
}
