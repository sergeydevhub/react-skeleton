import { AbstractAsyncActionCreatorHelper } from "./abstract-async-action-creator.helper";
import {TConditions, TriggeredAction} from "../actions";
import { TMeta } from '@core/transport'

export class TriggeredActionCreatorHelper<Payload extends any>
  extends AbstractAsyncActionCreatorHelper<TriggeredAction<Payload>> {
  public readonly condition: TConditions = 'triggered';

  public create(
    payload: Payload,
    meta: TMeta
  ): TriggeredAction<Payload> {
    return new TriggeredAction<Payload>({
      type: this.type,
      payload,
      meta
    });
  }
}
