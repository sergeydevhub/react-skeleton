import {
  RootAction,
  TConditions,
  TriggeredAction,
  FailureAction,
  SuccessfulAction,
  BaseAction,
  TActionNamingPartials
} from './actions'
import {
  TriggeredActionCreatorHelper,
  SuccessfulActionCreatorHelper,
  FailureActionCreatorHelper,
  TActionCreator,
  TCustomActionCreator,
  TBaseActionCreator,
  AbstractActionCreatorHelper,
  SyncActionCreatorHelper,
} from "./action-creators";
import { Reducer } from 'redux';
import ReduxTypes from 'ReduxTypes';
import { RootException } from "@core/exceptions/variations";
import { ClassConstructor } from "Utils";
import { AbstractRepository, StateHelper, DefaultStrategy } from "./state";
import { Method } from 'axios';

type TActionCreatorProvider<Action extends BaseAction> = (
  defaultActionCreator: TBaseActionCreator<Action>,
) => TCustomActionCreator<Action>

interface IMapping<T, E, S> {
  triggered: TriggeredAction<T>;
  failure: FailureAction;
  successful: SuccessfulAction<S>;
}

export type TConditionalActionCreators<T, E, S> = {
 [K in TConditions]: TActionCreator<IMapping<T, E, S>[K]>
}

type TCustomActionCreators<T, E, S> = {
  [K in TConditions]: TActionCreatorProvider<IMapping<T, E, S>[K]>
}

type TAsyncActionCreators = <Triggered, Failure extends RootException, Successful>(
  actionNamingPartials: [ Method, ...Array<string> ],
  customActionCreators?: Partial<TCustomActionCreators<Triggered, Failure, Successful>>
) => TConditionalActionCreators<Triggered, Failure, Successful>;

export type TInferActionsNode<T> = T extends Record<
  keyof T, Record<TConditions, TActionCreator<any>>
  > ? { [K in keyof T[keyof T]]: T[keyof T][K] } : never;


type TSyncActionCreator = <Payload>(
  // actionNamingPartials: [ Method, ...Array<string> ],
  actionNamingPartials: [ ...Array<string> ],
  customActionCreators?: TActionCreatorProvider<BaseAction<Payload>>
) => TActionCreator<RootAction<Payload>>;

type TReducerHandler<State extends ReduxTypes.State> = <Repository>(repository: Repository extends AbstractRepository<State> ? Repository : never) => Record<BaseAction['type'], Reducer<State, BaseAction>>;
type TReducerCreator<State extends ReduxTypes.State> = (reducerHandlers: TReducerHandler<State>, initialState: State) => Reducer<State, BaseAction>;

interface IReduxModuleHelper<State extends ReduxTypes.State> {
  sync: TSyncActionCreator;
  async: TAsyncActionCreators;
  reducer: TReducerCreator<State>;
}

export class ReduxModuleHelper<State extends object> implements IReduxModuleHelper<State> {
  constructor(
    public readonly moduleName: ReduxTypes.StatePartitions,
    private readonly Repository: ClassConstructor<AbstractRepository<State>>
  ) {}

  private actionCreatorFactory<Action extends BaseAction>(
    actionCreatorHelper: AbstractActionCreatorHelper<Action>,
    customActionCreator?: TActionCreatorProvider<Action>
  ): TActionCreator<Action> {
    //method has already been bounded
    const baseActionCreator: TBaseActionCreator<Action> = actionCreatorHelper.create;

    return Object.assign((
      customActionCreator
      ? customActionCreator(baseActionCreator)
      : baseActionCreator
    ), {
      type: actionCreatorHelper.type
    })
  }


  public sync<Payload>(
    actionNamingPartials: [ ...Array<string> ],
    customActionCreator?: TActionCreatorProvider<BaseAction<Payload>>
  ): TActionCreator<BaseAction<Payload>> {
    const syncHelper: SyncActionCreatorHelper<Payload> = new SyncActionCreatorHelper([this.moduleName, ...actionNamingPartials]);

    return this.actionCreatorFactory(syncHelper, customActionCreator);
  }

  public reducer(reducerHandler: TReducerHandler<State>, initialState: State): Reducer<State, BaseAction> {
    return (state: State = initialState, action: BaseAction) => {
      const helper = new StateHelper(state, new DefaultStrategy());
      const repository = new this.Repository(helper);
      const actionHandlers = reducerHandler(repository);
      if(action.type in actionHandlers) {
        return actionHandlers[action.type](state, action);
      }

      return state;
    }
  }

  public async<Triggered, Failure extends RootException, Successful>(
    namePartials: [ ...Array<string> ],
    customActionCreators?: Partial<TCustomActionCreators<Triggered, Failure, Successful>>
  ): TConditionalActionCreators<Triggered, Failure, Successful> {
    const actionNamePartials: TActionNamingPartials = [ this.moduleName, ...namePartials ];

    const triggeredHelper: TriggeredActionCreatorHelper<Triggered> = new TriggeredActionCreatorHelper<Triggered>(actionNamePartials);
    const triggered: TActionCreator<TriggeredAction<Triggered>> = this.actionCreatorFactory<
      TriggeredAction<Triggered>
    >(triggeredHelper, customActionCreators?.triggered);

    const failureHelper: FailureActionCreatorHelper<Failure> = new FailureActionCreatorHelper<Failure>(actionNamePartials);
    const failure: TActionCreator<FailureAction<Failure>> = this.actionCreatorFactory<
      FailureAction<Failure>
    >(failureHelper, (customActionCreators?.failure as any));

    const successfulHelper: SuccessfulActionCreatorHelper<Successful> = new SuccessfulActionCreatorHelper<Successful>(actionNamePartials);
    const successful: TActionCreator<SuccessfulAction<Successful>> = this.actionCreatorFactory<
      SuccessfulAction<Successful>
    >(successfulHelper, customActionCreators?.successful);

    return {
      triggered,
      failure,
      successful
    }
  }
}
