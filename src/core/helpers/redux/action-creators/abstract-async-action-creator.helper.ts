import { RootAction, TConditions } from "../actions";
import { AbstractActionCreatorHelper } from "./abstract-action-creator.helper";
import { Method } from 'axios';
import { BaseAction } from "../actions";


export abstract class AbstractAsyncActionCreatorHelper<ConditionalAction extends BaseAction>
  extends AbstractActionCreatorHelper<ConditionalAction> {
  public abstract readonly condition: TConditions;

  /*
    TODO Constructor overload for HTTP methods pattern matching
    constructor(actionNaming: [ Modules, Method, ...Array<string> ]);
  */
}
