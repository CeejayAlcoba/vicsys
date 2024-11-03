import { Timestamp } from "firebase/firestore";

export interface IAttendee {
  userId: string;
  joinedAt?: Timestamp;
}

export interface IEvent {
  id?: string;
  eventName: string;
  description: string;
  endTime: Date;
  startTime: Date;
  image: string;
  venue: string;
  ticketCategories: ITicketCategory[];
  attendees: IAttendee[];
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
  attendees: IAttendee[];
}
export interface ITicketCategory {
  categoryId?: string;
  category?: string;
  price: number;
  totalTickets: number;
  remainingTickets?: number;
}
