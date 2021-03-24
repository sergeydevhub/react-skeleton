import { ConditionStatus } from "@core/helpers/redux/actions";
import { RootEntity, RootRecord } from "@modules/app/root/data";

export type TRoles = 'user' | 'guest' | 'premium_user'

export type TStatus = {
  isGuest: boolean,
  isSocial: boolean,
  isDraft: boolean
} & ConditionStatus;

export interface IProfile extends RootEntity, RootRecord {
  phone?: string;
  email?: string;
  token?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  nickName: string;
  status?: TStatus;
  age?: number;
  roles?: Array<TRoles>;
}

export type TProfileEntity = Required<
  Pick<IProfile, 'nickName' | 'status' | 'roles' | 'photoURL'>
> & RootRecord & RootEntity;

export type TProfileRecord = Required<
  Pick<IProfile, 'phone' | 'nickName' | 'status' | 'email' | 'roles' | 'photoURL' | 'age' | 'token'>
> & RootRecord;

export type TokenRecord = {
  accessToken: string
};
