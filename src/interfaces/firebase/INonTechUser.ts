export interface INonTechUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    birthday: Date | "";
  }

  export interface INonTechUserLogin {
    email: string;
    password: string;
  }
  export interface INonTechUserPublic {
    id?: string;
    name: string;
    email: string;
    birthday: Date | "";
  }