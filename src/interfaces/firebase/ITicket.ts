import { ITicketCategory } from "./IEvent";

export interface ITIcket {
  created: Date;
  eventId: string;
  ticketBooks: ITicketCategory[];
  qrcodeUrl: string;
}
