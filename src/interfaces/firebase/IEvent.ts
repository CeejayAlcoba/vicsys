import { TicketStatus } from "./ITicket";
import { IUserPublic } from "./IUser";

export interface IAttendee {
  userId: string;
  joinedAt: Date;
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
  ticketCategoryId?: string;
  ticketName: string;
  ticketPerUser: number;
  ticketPrice: number;
  ticketRemaining?: number;
  ticketSold: number;
  ticketTotal: number;
}

export interface IEventUser extends IUserPublic {
  ticketStatus: TicketStatus;
  ticketName: string;
}
