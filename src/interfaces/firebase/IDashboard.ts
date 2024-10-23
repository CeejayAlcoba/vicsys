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
  image: string;
  eventName: string;
  endTime: Date;
  startTime: Date;
  totalTickets: number;
  ticketSolds: number;
}

export interface ITotalKidsPieChart {
  type: string;
  total: number;
}

export interface ITotalUsersPieChart {
  type: string;
  total: number;
}
