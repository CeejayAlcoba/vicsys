export interface ITIcket {
  created: Date;
  eventId: string;
  ticketBooks: ITicketCategory[];
  qrcodeUrl: string;
}

export interface ITicketCategory {
  category: string;
  price: number;
  totalTickets: number;
  currentTotalTickets?: number;
}
