import { ReduxModuleHelper } from "@core/helpers";
import ReduxTypes from 'ReduxTypes';
import StoreModels from 'StoreModels';
import { produce, Draft } from 'immer';
import { UserRecord } from "@core/modules/users/root/models";
import { AuthError } from "@core/errors/variations";
import {Reducer} from "redux";
import { initialState } from "../root/root.module";
import { Models } from "@core/modules/profile/root";

class AccountModule extends ReduxModuleHelper {}
const accountModule = new AccountModule('account');

const loginBuilder = accountModule.async('login');
const logoutBuilder = accountModule.async('logout');
const registrationBuilder = accountModule.async('registration');

const loginTriggered = loginBuilder.constructTriggered<Pick<Models.ProfileRecord, 'password' | 'email'>>();
const loginSuccessful = loginBuilder.constructSuccessful<UserRecord>();
const loginFailure = loginBuilder.constructFailure<AuthError>();

const login = {
  triggered: loginTriggered.triggered,
  successful: loginSuccessful.successful,
  failure: loginFailure.failure
};

const logoutTriggered = logoutBuilder.constructTriggered<any>();
const logoutSuccessful = logoutBuilder.constructSuccessful<any>();
const logoutFailure = logoutBuilder.constructFailure<AuthError>();

const logout = {
  triggered: logoutTriggered.triggered,
  successful: logoutSuccessful.succesful,
  failure: logoutFailure.failure
};

export type RootAction = ReturnType<
  ReduxTypes.InferActions<typeof login | typeof logout>
>

const reducer: Reducer = (
  state: StoreModels.Profile = initialState,
  action: RootAction
) => produce(state, (draft: Draft<StoreModels.Profile>) => {
  const handlers = {
    [login.successful.type]: () => {
      draft = Models.ProfileModelDTO.deserialize(action.payload) as StoreModels.Profile;
      draft.status = {
        ...initialState.status,
        ...action.status,
        isAuthenticated: true
      }
    },

    [login.triggered.type]: () => {
      draft.status = { ...draft.status, ...action.status }
    },

    [login.failure.type]: () => {
      draft.status = { ...draft.status, ...action.status }
    },

    [logout.triggered.type]: () => {},
    [logout.successful.type]: () => {},
    [logout.failure.type]: () => {}
  };

  if(action.type in handlers) {
    handlers[action.type]();
  }
});


const actions = {
  login,
  logout
};

export {
  AccountModule,
  accountModule,
  actions,
  reducer,
}

