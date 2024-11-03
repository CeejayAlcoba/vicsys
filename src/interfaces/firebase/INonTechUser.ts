import { Timestamp } from "firebase/firestore";

export interface IMyPuchaseEvent {
  eventId: string;
  ticketCategoryId: string;
  price: number;
  totalTickets: number;
  qrcodeUrl: string;
  purchasedAt: Timestamp;
}

export interface INonTechUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthday: Date | "";
  age: number;
  gender: string;
  contact: string;
  ministry: string;
  myPurchaseEvents?: IMyPuchaseEvent[] 
}

export interface INonTechUserLogin {
  email: string;
  password: string;
}
export interface INonTechUserPublic {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthday: Date | "";
  age: number;
  gender: string;
  contact: string;
  ministry: string;
}
