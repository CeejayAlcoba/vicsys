import { ITicketDetails } from "../../interfaces/firebase/IDashboard";
import { IEvent, IEventSave } from "../../interfaces/firebase/IEvent";
import documentRepository from "../repositories/documentRepository";
import eventRepository from "../repositories/eventRepository";
import { v4 as uuidv4 } from "uuid";
import ticketRepository from "../repositories/ticketRepository";

export default function eventService() {
  const _eventRepository = eventRepository();
  const _documentRepository = documentRepository();
  const _ticketRepositry = ticketRepository();

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
  const getTotalTicketPerEvent = async (): Promise<ITicketDetails[]> => {
    const events = await _eventRepository.getAll();

    const result = await Promise.all(
      events.map(async (e) => {
        const tickets = await _ticketRepositry.getByEventId(e.id ?? "");
        const ticketSold = tickets.reduce(
          (currT, prevT) =>
            (currT += prevT.ticketBooks.reduce(
              (currTB, prevTB) => (currTB += prevTB.totalTickets),
              0
            )),
          0
        );
        return {
          image: e.image,
          eventName: e.eventName,
          endTime: e.endTime,
          startTime: e.startTime,
          totalTickets:
            e.ticketCategories?.reduce(
              (curr, prev) => curr + (prev.totalTickets ?? 0),
              0
            ) ?? 0,
          ticketSolds: ticketSold,
        };
      })
    );

    return result;
  };

  const getTotalEvents = async () => {
    const events = await _eventRepository.getAll();
    return events.length;
  };
  return {
    add,
    update,
    deleteById,
    getAll,
    getById,
    getTotalTicketPerEvent,
    getTotalEvents,
  };
}
