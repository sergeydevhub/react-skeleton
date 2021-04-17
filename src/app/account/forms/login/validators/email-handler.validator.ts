import {AbstractHandlerMiddleware} from "@core/middlewares";
import { isEmail } from "class-validator";

export class EmailValidator extends AbstractHandlerMiddleware<string> {
  public message: string = '';

  public isAllowed(email: string): boolean {
    this.message = 'Email is invalid';

    return isEmail(email) && this._checkNext(email);
  }
}
