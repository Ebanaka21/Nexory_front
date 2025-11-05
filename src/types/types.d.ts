// src/types/types.ts
export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
}

export interface Message {
  user: string;
  message: string;
}
