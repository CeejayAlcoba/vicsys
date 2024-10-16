export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  birthday: Date | "";
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
}
