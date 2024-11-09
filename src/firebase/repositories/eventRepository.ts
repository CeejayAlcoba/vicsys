import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { IEvent, IEventUser } from "../../interfaces/firebase/IEvent";
import genericRepository from "./genericRepository";
import userRepository from "./userRepository";
import { IUser } from "../../interfaces/firebase/IUser";
import nonTechUserRepository from "./nonTechUserRepository";

export default function eventRepository() {
  const _genericRepository = genericRepository<IEvent>("events");
  const _userRepository = userRepository();
  const _nonTechUserRepository = nonTechUserRepository();
  const getAll = async () => {
    const events = await _genericRepository.getAll();
    return events;
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

  const getAttendeesByEventId = async (id: string): Promise<IEventUser[]> => {
    const event = await _genericRepository.getById(id);

    if (!event?.attendees?.length) {
      return [];
    }

    const userDetails = await Promise.all(
      event.attendees.map((attendee) =>
        _userRepository.getById(attendee.userId)
      )
    );
    const nonTechUsers = await Promise.all(
      event.attendees.map((attendee) =>
        _nonTechUserRepository.getById(attendee.userId)
      )
    );
    const allUsers = [...userDetails, ...nonTechUsers].filter(
      (user): user is IUser => user !== null && user !== undefined
    );
    let result: IEventUser[] = [];

    allUsers.map((user) =>
      user?.myPurchaseEvents.map((p) => {
        result.push({
          ...user,
          id: user.id,
          ticketName: p.ticketName,
          ticketStatus: p.status,
        });
      })
    );
    console.log(result);
    return result;
  };
  return { ..._genericRepository, getAttendeesByEventId, getAll, addAttendee };
}
