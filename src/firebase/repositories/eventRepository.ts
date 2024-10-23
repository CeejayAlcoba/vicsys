import { IEvent } from "../../interfaces/firebase/IEvent";
import genericRepository from "./genericRepository";
import ticketRepository from "./ticketRepository";

export default function eventRepository() {
  const _genericRepository = genericRepository<IEvent>("events");
  const _ticketRepository = ticketRepository();

  const getAll = async () => {
    const events = await _genericRepository.getAll();

    const result = await Promise.all(
      events.map(async (e) => {
        const newTicketCategories = await Promise.all(
          e.ticketCategories?.map(async (tc) => {
            const tickets = await _ticketRepository.getByEventId(e.id || "");
            const currentTotalTickets =
              tc.totalTickets -
              tickets.reduce(
                (curr, prev) =>
                  curr +
                  prev.ticketBooks
                    .filter((tb) => tb.category == tc.category)
                    .reduce(
                      (currTB, prevTB) => currTB + prevTB.totalTickets,
                      0
                    ),
                0
              );

            return {
              ...tc,
              currentTotalTickets: currentTotalTickets,
            };
          }) || []
        );

        return {
          ...e,
          ticketCategories: newTicketCategories,
        };
      })
    );

    return result;
  };
  return { ..._genericRepository, getAll };
}
