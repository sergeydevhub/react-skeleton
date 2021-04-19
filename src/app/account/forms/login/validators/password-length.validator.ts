import {AbstractHandlerMiddleware} from "@core/middlewares";

export class LengthValidator extends AbstractHandlerMiddleware<Array<string>> {
  public message: string = '';
  private readonly _allowedLength: number;

  constructor(allowedLength: number) {
    super();
    this._allowedLength = allowedLength;
  }

  public isAllowed(password: Array<string>): boolean {
    this.message = `Field contains ${ password.length } of ${this._allowedLength} required`;

    return password.length >= this._allowedLength && this._checkNext(password);
  }
}
