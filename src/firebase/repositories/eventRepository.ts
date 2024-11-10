import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { IEvent } from "../../interfaces/firebase/IEvent";
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

  const getAttendeesByEventId = async (id: string): Promise<IUser[]> => {
    const users = await _userRepository.getAll();
    const nonTechUsers = await _nonTechUserRepository.getAll();

    const allUsers = [...users, ...nonTechUsers].filter(
      (user): user is IUser =>
        user !== null &&
        user !== undefined &&
        user.hasOwnProperty("myPurchaseEvents")
    );

    const filtered = await allUsers
      .filter((u) => u.myPurchaseEvents.some((m) => m.eventId == id))
      .map((user) => ({
        ...user,
        myPurchaseEvents: user?.myPurchaseEvents
          ? user.myPurchaseEvents.filter((p) => p.eventId == id)
          : [],
      }));
    return filtered;
  };
  return { ..._genericRepository, getAttendeesByEventId, getAll, addAttendee };
}
