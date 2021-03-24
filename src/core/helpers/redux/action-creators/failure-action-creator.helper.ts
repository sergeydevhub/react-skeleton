import { RootException } from "@core/exceptions/variations";
import { AbstractAsyncActionCreatorHelper } from "./abstract-async-action-creator.helper";
import { TConditions, FailureAction } from "../actions";
import { TMeta } from '@core/transport'

export class FailureActionCreatorHelper<T extends RootException>
  extends AbstractAsyncActionCreatorHelper<FailureAction<T>> {
  public readonly condition: TConditions = 'failure';

  public create(
    payload: T,
    meta: TMeta = {}
  ): FailureAction<T> {
    return new FailureAction<T>({
      message: payload.message,
      type: this.type,
      payload
    })
  }
}
