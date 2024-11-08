import { ITicketDetails } from "../../interfaces/firebase/IDashboard";
import { IEvent, IEventSave } from "../../interfaces/firebase/IEvent";
import documentRepository from "../repositories/documentRepository";
import eventRepository from "../repositories/eventRepository";
import { v4 as uuidv4 } from "uuid";
import userRepository from "../repositories/userRepository";

export default function eventService() {
  const _eventRepository = eventRepository();
  const _documentRepository = documentRepository();
  const _userRepository = userRepository();
  const add = async (data: IEventSave) => {
    let imageUrl = "";
    if (data.image instanceof File) {
      const { url } = await _documentRepository.uploadToFirebase(
        data.image,
        `event_images/${uuidv4()}.png`
      );
      imageUrl = url;
      const newData: IEvent = {
        ...data,
        endTime: new Date(data.endTime),
        startTime: new Date(data.startTime),
        image: typeof data.image == "string" ? data.image : imageUrl,
      };
      return _eventRepository.add(newData);
    }
  };

  const update = async (id: string, data: IEventSave) => {
    if (data.image instanceof File) {
      const { url } = await _documentRepository.uploadToFirebase(
        data.image,
        `event_images/${uuidv4()}.png`
      );
      const newData: IEvent = {
        ...data,
        endTime: new Date(data.endTime),
        startTime: new Date(data.startTime),
        image: url,
      };
      return await _eventRepository.update(id, newData);
    }
    const newData: IEvent = {
      ...data,
      endTime: new Date(data.endTime),
      startTime: new Date(data.startTime),
      image: data.image,
    };
    return await _eventRepository.update(id, newData);
  };
  const deleteById = async (id: string) => {
    await _eventRepository.deleteById(id);
  };

  const getById = async (id: string) => {
    return await _eventRepository.getById(id);
  };

  const getAll = async () => {
    return await _eventRepository.getAll();
  };

  const getTotalEvents = async () => {
    const events = await _eventRepository.getAll();
    return events.length;
  };

  const addAttendee = async (eventId: string, userId: string) => {
    return await _eventRepository.addAttendee(eventId, userId);
  };
  const getAttendeesByEventId = async (eventId: string) => {
    return await _eventRepository.getAttendeesByEventId(eventId);
  };
  return {
    getAttendeesByEventId,
    add,
    update,
    deleteById,
    getAll,
    getById,
    getTotalEvents,
    addAttendee,
  };
}
