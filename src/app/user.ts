export interface RawUser {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
}

export interface AuthResponseData {
  user: User;
  token: string;
}
