import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { IEvent } from "../../interfaces/firebase/IEvent";
import genericRepository from "./genericRepository";
import ticketCategoryRepository from "./ticketCategoryRepository";
import userRepository from "./userRepository";
import { IUser, IUserPublic } from "../../interfaces/firebase/IUser";

export default function eventRepository() {
  const _genericRepository = genericRepository<IEvent>("events");
  const _ticketCategoryRepository = ticketCategoryRepository();
  const _userRepository = userRepository();
  const getAll = async () => {
    const events = await _genericRepository.getAll();

    const result = await Promise.all(
      events.map(async (e) => {
        const userPurchases = await _userRepository.getPurchasesByEventId(
          e.id ?? ""
        );

        const newTicketCategories = await Promise.all(
          e.ticketCategories.map(async (tc) => {
            const category = await _ticketCategoryRepository.getById(
              tc.categoryId ?? ""
            );
            const totalSoldTicket = userPurchases.reduce(
              (uCurr, uPrev) =>
                (uCurr += uPrev.purchases
                  .filter((p) => p.ticketCategoryId == tc.categoryId)
                  .reduce((pCurr, pPrev) => (pCurr += pPrev.totalTickets), 0)),
              0
            );
            console.log(totalSoldTicket);
            return {
              ...tc,
              category: category?.description ?? "",
              remainingTickets: tc.totalTickets - totalSoldTicket,
            };
          })
        );

        return {
          ...e,
          ticketCategories: newTicketCategories,
        };
      })
    );

    return result;
  };

  const addAttendee = async (
    eventId: string,
    userId: string
  ): Promise<void> => {
    const db = getFirestore();
    const eventRef = doc(db, "events", eventId);

    await updateDoc(eventRef, {
      attendees: arrayUnion({ userId: userId }),
    });
  };
  const getAttendeesByEventId = async (id: string): Promise<IUserPublic[]> => {
    const event = await _genericRepository.getById(id);

    if (!event?.attendees?.length) {
      return [];
    }

    const userDetails = await Promise.all(
      event.attendees.map((attendee) =>
        _userRepository.getById(attendee.userId)
      )
    );
    return userDetails
      .filter((user): user is IUser => user !== null)
      .map(
        (user): IUserPublic => ({
          ...user,
          id: user.id,
        })
      );
  };
  return { ..._genericRepository, getAttendeesByEventId, getAll, addAttendee };
}
