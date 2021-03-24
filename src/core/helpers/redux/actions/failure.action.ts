import {RootException} from '@core/exceptions/variations';
import { BaseAction } from './base.action';
import { RootAction } from "./root.action";
import { TMeta } from '@core/transport';
import { ConditionStatus as Status } from './options';

type TTypeGuard = (action: RootAction | BaseAction) => action is FailureAction;

export const isFailureTypeGuard: TTypeGuard = (
  action: RootAction | BaseAction
): action is FailureAction => {
  return action instanceof FailureAction || 'status' in action ? (action as any).status.isFailure : false;
};

export class FailureAction<Exception extends RootException = RootException>
  extends BaseAction<Exception> {
  public readonly message!: Exception['message'];
  public readonly payload!: Exception;
  public readonly meta?: TMeta;

  public readonly status?: Status = new Status({
    isTriggered: true,
    isFailure: true
  });

  constructor(action: FailureAction<Exception>) {
    super(action);
  }
}
