import {AbstractHandlerMiddleware} from "@core/middlewares";
import {isDecimal} from "class-validator";

export class DigitsContainsValidator extends AbstractHandlerMiddleware {
  public message: string = '';
  private readonly _amount: number;

  constructor(amount: number) {
    super();
    this._amount = amount;
  }

  public isAllowed(field: Array<string>): boolean {
    const amount: number = field.reduce(
      (accum, current) => isDecimal(current) ? ++accum : accum, 0
    );

    this.message = `Field contains only ${ amount } of ${this._amount} required`;

    return amount >= this._amount && this.checkNext(field);
  }
}
