import { Models } from "@core/modules/users/root";
import ReduxTypes from 'ReduxTypes';
import { ProfileRecord } from "./types";

export class ProfileModelFormatter implements ReduxTypes.Formatter<Models.User, ProfileRecord> {
  static serialize(obj: Models.User): Partial<ProfileRecord> {
    const {firstName, lastName, ...rest} = obj;
    const record: Partial<ProfileRecord> = {
      ...rest,
      photo_url: obj.photoURL,
      first_name: firstName,
      last_name: lastName
    };

    return record;
  };

  static deserialize(obj: ProfileRecord): Partial<Models.User> {
    const { first_name, last_name, created_at, updated_at, photo_url, ...rest } = obj;

    const user: Partial<Models.User> = {
      ...rest,
      photoURL: photo_url,
      firstName: first_name,
      lastName: last_name
    };

    return user;
  }
}
