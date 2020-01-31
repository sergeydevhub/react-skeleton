import ReduxTypes from 'ReduxTypes';
import { UserRecord, User } from "./types";
import {ProfileRecord} from "@core/modules/profile/root/models";

export class UsersModelDTO implements ReduxTypes.DTO<User, UserRecord> {
  static serialize(user: User): Partial<UserRecord> {
    const {firstName, lastName, ...rest} = user;
    const record: Partial<ProfileRecord> = {
      ...rest,
      photo_url: user.photoURL,
      first_name: firstName,
      last_name: lastName
    };

    return record;
  }

  static deserialize(record: UserRecord): Partial<User> {
    const { first_name, last_name, photo_url } = record;
    const { created_at, updated_at, ...rest } = record;

    const user: Partial<User> = {
      ...rest,
      photoURL: photo_url,
      firstName: first_name,
      lastName: last_name
    };

    return user;
  }
}
