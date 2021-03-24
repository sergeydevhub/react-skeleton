import { AbstractAsyncActionCreatorHelper } from "./abstract-async-action-creator.helper";
import {TConditions, SuccessfulAction} from "../actions";

export class SuccessfulActionCreatorHelper<Payload extends any>
  extends AbstractAsyncActionCreatorHelper<SuccessfulAction<Payload>> {
  public readonly condition: TConditions = 'successful';

  public create(
    payload: Payload,
  ): SuccessfulAction<Payload> {
    return new SuccessfulAction<Payload>({
      type: this.type,
      payload,
    });
  }
}
