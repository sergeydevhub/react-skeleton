import {BaseAction, RootAction, TActionNamingPartials} from "../actions";
import {Action as ReduxAction, ActionCreator } from "redux";
import { TMeta } from '@core/transport'

export type TBaseActionCreator<Action extends BaseAction> = (payload: Action['payload'], meta?: TMeta) => Action;

export type TCustomActionCreator<Action extends RootAction> = (...args: Array<any>) => Action;

export type TActionCreator<Action extends RootAction> = (
  TCustomActionCreator<Action> | TBaseActionCreator<
    Action extends BaseAction ? Action : BaseAction
  >
) & ReduxAction<string>;

export interface IActionCreatorHelper {
  readonly type: BaseAction['type'];
  create: TBaseActionCreator<BaseAction>;
}

export abstract class AbstractActionCreatorHelper<
    Action extends BaseAction
  > implements IActionCreatorHelper {

  public readonly delimiter: string;
  public readonly type: Action['type'];

  protected readonly _condition?: string;

  public constructor(
    actionTypePartials: TActionNamingPartials,
    delimiter: string = '_'
  ) {
    this.delimiter = delimiter;
    this.type = this._formatType(actionTypePartials);
    this.create = this.create.bind(this);
  }

  protected _formatType(actionNaming: TActionNamingPartials): Action['type'] {
    if(this._condition) {
      actionNaming.push(this._condition)
    }

    return actionNaming
      .filter(Boolean)
      .join(this.delimiter)
      .toUpperCase();
  }

  public abstract create(...args: Array<any>): Action;
}
