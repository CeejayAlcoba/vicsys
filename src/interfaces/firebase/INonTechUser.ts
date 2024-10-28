export interface IPurchaseEvent {
  eventId: string;
  qrcodeUrl: string;
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
  myPurchaseEvents?: IPurchaseEvent[] 
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
