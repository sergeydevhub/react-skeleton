import StoreModels from 'StoreModels';
import { UsersModelFormatter } from "./models/users.model";
import { UserRecord, User } from "./models";
import { Reducer } from 'redux';
import produce, { Draft } from 'immer';
import {ReduxModuleHelper, StatefulActionCreators} from "@core/helpers";
import {ActionError} from "@core/errors/variations";
import ReduxTypes from "ReduxTypes";

export class UsersModule extends ReduxModuleHelper {}

export const usersModule = new UsersModule('users');

const getAll: StatefulActionCreators = (() => {
  const creator = usersModule.async('getAll');
  const { triggered } = creator.constructTriggered<number>();
  const { successful } = creator.constructSuccessful<Array<UserRecord>>();
  const { failure } = creator.constructFailure<ActionError>();

  return {
    triggered,
    successful,
    failure
  }
})();

const initialState: StoreModels.Users = {};

export type RootAction = ReturnType<ReduxTypes.InferActions<typeof getAll>>

const reducer: Reducer = (
  state: StoreModels.Users = initialState,
  action: ReduxTypes.RootAction
) => produce(state,(draft: Draft<StoreModels.Users>) => {
  const handlers = {
    [getAll.triggered.type]: () => {},

    [getAll.successful.type]: () => {
      action.payload.map((userRecord: UserRecord) => {
        draft[userRecord.id] = UsersModelFormatter.deserialize(userRecord) as User;
      })
    },

    [getAll.failure.type]: () => {},
  };

  if(action.type in handlers) {
    handlers[action.type]();
    draft.status = action.status
  }
});

const actions = {
  getAll
};

export {
  actions,
  initialState,
  reducer
}
