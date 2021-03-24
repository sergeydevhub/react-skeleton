import {AbstractHandlerMiddleware} from "@core/middlewares";

export class PasswordLengthValidator extends AbstractHandlerMiddleware {
  public message: string = '';
  private readonly _allowedLength: number;

  constructor(allowedLength: number) {
    super();
    this._allowedLength = allowedLength;
  }

  public isAllowed(password: Array<string>): boolean {
    this.message = `Password contains ${ password.length } of ${this._allowedLength} required`;

    return password.length >= this._allowedLength && this.checkNext(password);
  }
}
