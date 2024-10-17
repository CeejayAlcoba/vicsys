import { ITIcket } from "../../interfaces/firebase/ITicket";
import genericRepository from "./genericRepository";

export default function ticketRepository() {
  const _genericRepository = genericRepository<ITIcket>("tickets");
  return { ..._genericRepository };
}
