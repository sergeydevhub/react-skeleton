import { ConditionStatuses } from "@core/helpers";

export interface UserRecord {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  password: string;
  email: string;
  token: string;
  photo_url: string;
  created_at?: string;
  updated_at?: string
}

export interface User extends ConditionStatuses {
  id: string;
  email: string;
  nickname: string;
  photoURL: string;
  firstName: string;
  lastName: string;
  age: number;
  country: string;
}

declare module 'StoreModels' {
  export interface Users {
    [key: string]: User
  }
}
