import { User } from './user.model';

export interface RawUser {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
}
