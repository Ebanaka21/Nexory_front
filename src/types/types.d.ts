import { User } from "./types";
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Message {
  user: string;
  message: string;
}
