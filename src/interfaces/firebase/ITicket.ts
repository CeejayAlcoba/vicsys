export interface ITIcket {
  created: Date;
  qrcodeUrl: string;
}

export interface ITicketCategory {
  category: string;
  price: number;
  totalTickets: number;
}
