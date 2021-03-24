import { BaseAction } from './base.action';
import { ConditionStatus as Status } from './options';
import {RootAction} from './root.action';

type TTypeGuard = (action: RootAction | BaseAction) => action is SuccessfulAction<any>;

export const isSuccessfulTypeGuard: TTypeGuard = (
  action: RootAction | BaseAction
): action is SuccessfulAction<any> => {
  return action instanceof SuccessfulAction || 'status' in action ? (action as any).status.isSuccessful : false;
};

export class SuccessfulAction<Payload> extends BaseAction<Payload>{
  public readonly payload!: Payload;

  public readonly status?: Status = new Status({
    isSuccessful: true
  });

  constructor(
    action: SuccessfulAction<Payload>,
  ) {
    super(action);
  }
}
