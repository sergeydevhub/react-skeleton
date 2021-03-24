import {TMeta} from "@core/transport";
import {ConditionStatus} from "@core/helpers/redux/actions/options";
import {RootAction} from "@core/helpers/redux/actions/root.action";

export class BaseAction<Payload = any> implements RootAction {
  public readonly type!: string;
  public readonly payload!: Payload;
  public readonly meta?: TMeta;
  public readonly status?: ConditionStatus;

  constructor(action: BaseAction<Payload>) {
    Object.assign(this, action);
  }
}
