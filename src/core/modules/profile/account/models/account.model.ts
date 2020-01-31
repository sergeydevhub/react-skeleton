import ReduxTypes from 'ReduxTypes'
import { FacebookUser } from "./types";
import { Models } from '@core/modules/users/root';

export class FacebookUserDTO implements ReduxTypes.DTO<Models.User, FacebookUser> {
  serialize(obj: Models.User): Partial<FacebookUser> {
    const { nickname, firstName, lastName, ...rest } = obj;
    return {
      ...rest,
      name: nickname,
      first_name: firstName,
      last_name: lastName,
    }
  }

  deserialize(obj: FacebookUser): Partial<Models.User> {
    const { name, first_name, last_name, ...rest } = obj;

    return {
      ...rest,
      nickname: name,
      firstName: first_name,
      lastName: last_name,
    }
  }
}
