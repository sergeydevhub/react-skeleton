import { BaseAction } from "./base.action";
import { TMeta } from '@core/transport';
import { ConditionStatus as Status } from './options';
import {RootAction} from "@core/helpers/redux/actions/root.action";

type TTypeGuard = (action: RootAction | BaseAction) => action is TriggeredAction<any>;

export const isTriggeredTypeGuard: TTypeGuard = (
  action: RootAction | BaseAction
): action is TriggeredAction<any> => {
  return action instanceof TriggeredAction || 'status' in action ? (action as any).status.isTriggered : false;
};

export class TriggeredAction<Payload> extends BaseAction<Payload>{
  public readonly payload!: Payload;
  public readonly meta!: TMeta;

  public readonly status?: Status = new Status({
    isTriggered: true
  });

  constructor(action: TriggeredAction<Payload>) {
    super(action);
  }
}
