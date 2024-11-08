export default interface IDahsboard {
  totalRegistration: number;
  totalKids: number;
  totalEvents: number;
  totalTicketSold: number;
  ticketDetails: ITicketDetails[];
  totalKidsPieDetails: ITotalKidsPieChart[];
  totalUserPieChart: ITotalUsersPieChart[];
}
export interface ITicketDetails {
  id?: string;
  image: string;
  eventName: string;
  endTime: Date;
  startTime: Date;
  totalTickets: number;
  ticketSolds: number;
  status: TicketStatus;
}

export interface ITotalKidsPieChart {
  type: string;
  total: number;
}

export interface ITotalUsersPieChart {
  type: string;
  total: number;
}

export enum TicketStatus {
  completed = "completed",
  paid = "paid",
  pending = "pending"
}
