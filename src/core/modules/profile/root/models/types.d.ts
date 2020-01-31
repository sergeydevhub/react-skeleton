import { Models } from '@core/modules/users/root'
import { Status as Conditions } from "@core/helpers";

export interface Status extends Conditions {
  isGuest: boolean;
  isAuthenticated: boolean;
  isSocial: boolean
}

export interface ProfileRecord extends Models.UserRecord {}

declare module 'StoreModels' {
  export interface Profile extends Models.User {
    status: Status
    authType: 'internal' | 'google' | 'facebook' | 'github' | 'twitter' | undefined
  }
}
