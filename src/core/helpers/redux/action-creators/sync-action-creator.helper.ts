import { AbstractActionCreatorHelper } from "@core/helpers/redux/action-creators";
import { BaseAction } from "@core/helpers/redux/actions";

export class SyncActionCreatorHelper<Payload extends any>
  extends AbstractActionCreatorHelper<BaseAction> {

  public create(
    payload: Payload
  ): BaseAction<Payload> {
    return new BaseAction<Payload>({
      type: this.type,
      payload
    });
  }
}
