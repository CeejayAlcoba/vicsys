import { IMyPuchaseEvent } from "../../interfaces/firebase/INonTechUser";
import eventRepository from "../repositories/eventRepository";
import userRepository from "../repositories/userRepository";

export default function bookingService() {
  const _userRepository = userRepository();
  const _eventRepository = eventRepository();

  const bookEventPurchases = async (
    eventId: string,
    userId: string,
    myPurchases: IMyPuchaseEvent[]
  ) => {
    const event = await _eventRepository.getById(eventId);
    const user = await _userRepository.getById(userId);
    if (!event || !user) throw new Error("Event or user not found");

    const updatedTicketCategories = event.ticketCategories.map((t) => ({
      ...t,
      ticketRemaining:
        (t.ticketRemaining ?? 0) -
        myPurchases.filter((m) => m.ticketName == t.ticketName).length,
    }));

    if (!event?.attendees?.some((a) => a.userId == user?.id)) {
      await _eventRepository.update(event?.id || "", {
        ...event,
        ticketCategories: updatedTicketCategories,
        attendees: event.attendees
          ? [...event.attendees, { userId: userId }]
          : [{ userId: userId }],
      });
    }
    return await _userRepository.update(userId, {
      ...user,
      myPurchaseEvents: user.myPurchaseEvents
        ? [...user.myPurchaseEvents, ...myPurchases]
        : [...myPurchases],
    });
  };
  const bookEventPurchase = async (
    eventId: string,
    userId: string,
    myPurchase: IMyPuchaseEvent
  ) => {
    const event = await _eventRepository.getById(eventId);
    const user = await _userRepository.getById(userId);
    if (!event || !user) throw new Error("Event or user not found");

    const updatedTicketCategories = event.ticketCategories.map((t) => ({
      ...t,
      ticketRemaining: (t.ticketRemaining ?? 0) - 1,
    }));

    if (!event?.attendees.some((a) => a.userId == user?.id)) {
      await _eventRepository.update(event?.id || "", {
        ...event,
        ticketCategories: updatedTicketCategories,
        attendees: [...event.attendees, { userId: userId }],
      });
    }

    return await _userRepository.update(userId, {
      ...user,
      myPurchaseEvents: [...user.myPurchaseEvents, myPurchase],
    });
  };

  return {
    bookEventPurchases,
    bookEventPurchase,
  };
}
