import { Action as ReduxAction } from 'redux';
import { RootError, ActionError } from "@core/errors/variations";

export interface Action extends ReduxAction<string> {
  [key: string]: any
}

export type Meta = Record<string, any>;

type ConditionValue = boolean

export interface IStatus {
  [key: string]: ConditionValue
}

export interface Status extends IStatus {
  isTriggered: ConditionValue;
  isSuccessful: ConditionValue;
  isFailure: ConditionValue;
}

export type ConditionStatuses = {
  status: Status
}

export interface BaseAction<TPayload = any> {
  [key: string]: any;
  payload?: TPayload;
}

interface TriggeredCondition<T> extends BaseAction<T> {
  payload: T;
  meta: Meta
}

interface FailureCondition<E extends RootError = RootError> extends BaseAction {
  error: E;
}

export interface SuccessfulCondition<T> extends BaseAction<T> {
  payload: T;
}

export type SuccessfulAction<T> = SuccessfulCondition<T> & Action & ConditionStatuses;
export type FailureAction<T extends RootError = RootError> = FailureCondition<T> & Action & ConditionStatuses;
export type TriggeredAction<T> = TriggeredCondition<T> & Action & ConditionStatuses;

export interface DefaultActionCreator<TAction extends BaseAction> {
  (action: TAction): Action;
}

export interface BaseActionCreator {
  (...args: Array<any>): Action
}

interface ActionCreatorProvider<TAction extends BaseAction> {
  (actionCreator: DefaultActionCreator<TAction>): BaseActionCreator;
}

type ActionCreator<T extends BaseAction> = (
  BaseActionCreator | DefaultActionCreator<T>
) & ReduxAction<string>

export interface StatefulActionCreators {
  successful: ActionCreator<SuccessfulCondition<any>>
  triggered: ActionCreator<TriggeredCondition<any>>
  failure: ActionCreator<FailureCondition<RootError>>
}

type Wrapper<T extends BaseAction<any>> = Record<string, ActionCreator<T>>

type Triggered = <T>(
  actionCallback?: ActionCreatorProvider<TriggeredCondition<T>>
) => Wrapper<TriggeredCondition<T>>;

type Successful = <T>(
  actionCallback?: ActionCreatorProvider<SuccessfulCondition<T>>
) => Wrapper<SuccessfulCondition<T>>;

type Failure = <T extends RootError = RootError>(
  actionCallback?: ActionCreatorProvider<FailureCondition<T>>
) => Wrapper<FailureCondition<T>>


interface StatefulActionCreatorHelper {
  constructSuccessful: Successful;
  constructTriggered: Triggered;
  constructFailure: Failure;
}

export const defaultStatus: Status = {
  isTriggered: false,
  isSuccessful: false,
  isFailure: false,
};

interface TypeGuards {
  isTriggeredAction<T>(action: TriggeredAction<T>): action is TriggeredAction<T>;
  isSuccessfulAction<T>(action: SuccessfulAction<T>): action is SuccessfulAction<T>;
  isFailureAction<T extends RootError>(action: FailureAction<T>): action is FailureAction<T>;
}

export const typeGuards: TypeGuards = {
  isTriggeredAction<T>(
    action: TriggeredAction<T>
  ): action is TriggeredAction<T> {
    return (action as TriggeredAction<T>).status.isTriggered;
  },

  isSuccessfulAction<T>(
    action: SuccessfulAction<T>
  ): action is SuccessfulAction<T> {
    return (action as SuccessfulAction<T>).status.isSuccessful;
  },

  isFailureAction<T extends RootError>(
    action: FailureAction<T>
  ): action is FailureAction<T> {
    return (action as FailureAction<T>).status.isFailure
  }
};

interface ModuleHelper {
  async<T>(actionBlank: string): StatefulActionCreatorHelper;

  sync<T>(
    actionBlank: string,
    actionCreatorProvider?: ActionCreatorProvider<BaseAction<T>>
  ): ActionCreator<BaseAction<T>>;
}

//Setup correct working of TypesUtils.NoInfer<T>
export class ReduxModuleHelper implements ModuleHelper {
  public readonly delimiter: string = '_';
  public readonly name: string;

  constructor(name: string = '') {
    this.name = (name || this.constructor.name).toLowerCase();
  }

  public sync<T>(
    actionBlank: string,
    actionCreatorProvider?: ActionCreatorProvider<BaseAction<T>>
  ): ActionCreator<BaseAction<T>> {
    const type = [
      this.name,
      actionBlank
    ].join(this.delimiter).toUpperCase();
    const defaultProps = { type };

    const baseActionCreator: BaseActionCreator = (
      baseAction: BaseAction<T>
    ): BaseAction<T> & Action => {
      const action: BaseAction<T> & Action = Object.assign<BaseAction<T>, typeof defaultProps>(baseAction, defaultProps);

      return action;
    };

    const result = actionCreatorProvider
      ? actionCreatorProvider(baseActionCreator)
      : baseActionCreator;

    const actionCreator: ActionCreator<BaseAction<T>> = Object.assign(result, defaultProps);

    return actionCreator;
  }

  public async(actionBlank: string): StatefulActionCreatorHelper {
    const constructType = (
      condition: Partial<keyof StatefulActionCreators>
    ): string => [
      this.name,
      actionBlank,
      condition
    ].join(this.delimiter).toUpperCase();

    const constructTriggered: Triggered = <T>(
      actionCreatorProvider?: ActionCreatorProvider<TriggeredCondition<T>>,
    ): Wrapper<TriggeredCondition<T>> => {
      const type: string = constructType('triggered');

      const defaultActionCreator: DefaultActionCreator<TriggeredCondition<T>> = (
        actionCondition: TriggeredCondition<T>
      ): TriggeredAction<T> => {
        const status: Status = {
          isTriggered: true,
          isFailure: false,
          isSuccessful: false
        };

        const defaultProps = { type, status };
        const action: TriggeredAction<T> = Object.assign<TriggeredCondition<T>, typeof defaultProps>(
          actionCondition, defaultProps
        );

        return action
      };

      const actionCreator = actionCreatorProvider
        ? actionCreatorProvider(defaultActionCreator)
        : defaultActionCreator;

      const triggered: ActionCreator<TriggeredCondition<T>> = Object.assign(actionCreator,{ type });
      return { triggered }
    };

    const constructSuccessful: Successful = <T>(
      actionCreatorProvider?: ActionCreatorProvider<SuccessfulCondition<T>>,
    ): Wrapper<SuccessfulCondition<T>> => {
      const type: string = constructType('successful');

      const defaultActionCreator: DefaultActionCreator<SuccessfulCondition<T>> = (
        actionCondition: SuccessfulCondition<T>
      ): SuccessfulAction<T> => {
        const status: Status = {
          isTriggered: false,
          isFailure: false,
          isSuccessful: true
        };

        const defaultProps = { type, status };
        const action: SuccessfulAction<T> = Object.assign<SuccessfulCondition<T>, typeof defaultProps>(
          actionCondition, defaultProps
        );

        return action
      };

      const actionCreator = actionCreatorProvider
        ? actionCreatorProvider(defaultActionCreator)
        : defaultActionCreator;
      const successful: ActionCreator<SuccessfulCondition<T>> = Object.assign(actionCreator,{ type });

      return { successful }
    };


    const constructFailure: Failure = <T extends RootError>(
      actionCreatorProvider?: ActionCreatorProvider<FailureCondition<T>>,
    ): Wrapper<FailureCondition<T>> => {
      const type: string = constructType('failure');

      const defaultActionCreator: DefaultActionCreator<FailureCondition<T>> = (
        actionCondition: FailureCondition<T>
      ): FailureAction<T> => {
        const status: Status = {
          isTriggered: true,
          isFailure: true,
          isSuccessful: false
        };

        const error: ActionError = !actionCondition.error
          ? new ActionError(type)
          : actionCondition.error;
        const defaultProps = { type, status, error };
        const action: FailureAction<T> = Object.assign<FailureCondition<T>, typeof defaultProps>(
          actionCondition, defaultProps
        );

        return action;
      };

      const actionCreator = actionCreatorProvider
        ? actionCreatorProvider(defaultActionCreator)
        : defaultActionCreator;
      const failure: ActionCreator<FailureCondition<T>> = Object.assign(actionCreator, { type });

      return { failure }
    };

    return {
      constructTriggered,
      constructSuccessful,
      constructFailure
    }
  }
}
