import { ITicketCategory } from "./ITicket";

export interface IEvent {
  id?: string;
  eventName: string;
  description: string;
  endTime: Date;
  startTime: Date;
  image: string;
  venue: string;
  ticketCategories: ITicketCategory[];
}
export interface IEventSave {
  id?: string;
  eventName: string;
  description: string;
  endTime: Date;
  startTime: Date;
  image: string | File;
  venue: string;
  ticketCategories: ITicketCategory[];
}
interface EventDate {
  moment(arg0: string): unknown;
  seconds: number;
  nanoseconds: number;
}
