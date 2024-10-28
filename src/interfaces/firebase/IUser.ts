import { User } from "firebase/auth";
import IChild from "./IChild";

export interface IUserDetails extends User {
  provider: IUserProvider;
}
export enum IUserProvider {
  password = "password",
  facebook = "facebook.com",
  google = "google.com",
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthday: Date | "";
  age: number;
  gender: string;
  contact: string;
  ministry: string;
  children?: IChild[];
}

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserPublic {
  id?: string;
  name: string;
  email: string;
  birthday: Date | "";
  age: number;
  gender: string;
  contact: string;
  ministry: string;
}

export interface IUserChangePassword {
  currentPassword: string;
  newPassword: string;
}
