import { Reducer } from 'redux';
import { FormikHelpers } from 'formik';
import * as ReduxTypes from 'ReduxTypes';
import { ObjectRepository } from "@core/helpers/redux/state";
import { ReduxModuleHelper } from "@core/helpers/redux";
import { IProfile, ProfileEntity, ProfileRecord, TokenRecord} from "@modules/profile/root/data";
import { HTTPResponseException, AuthException } from '@core/exceptions/variations';
import { InstanceValidator } from "@core/validation";
import { ClassConverter } from "@core/converters";
import { BaseAction, RootAction } from "@core/helpers/redux/actions";
import { LoginDTO, LogoutDTO } from "./api";

type TState = ProfileEntity | Partial<ProfileEntity>;

export const initialState: TState = {};

const profileModule = new ReduxModuleHelper<TState>('profile', ObjectRepository);

const getProfile = profileModule.async<
  undefined,
  HTTPResponseException,
  ProfileEntity | TState
>(['get'], {
  successful: (actionCreator) => (response: unknown) => {
    const validator = new InstanceValidator(ProfileRecord);

    if(validator.isValid(response)) {
      const record = response as ProfileRecord;
      const converter = new ClassConverter<ProfileRecord, ProfileEntity>();
      const result = converter.toClass(record, ProfileEntity);

      return actionCreator(result);
    }

    return actionCreator(initialState)
  }
});

const login = profileModule.async<LoginDTO, AuthException, TokenRecord>(['login']);
const logout = profileModule.async<LogoutDTO, AuthException, any>(['logout']);

export const reducer: Reducer<TState, BaseAction> = profileModule.reducer(
  (repository: ObjectRepository<TState>) => ({
    [getProfile.successful.type]: (
      state: TState = initialState, action: ReturnType<typeof getProfile.successful>
    ) => {
      const validator = new InstanceValidator(ProfileEntity);
      if(validator.isValid(action.payload)) {
        return repository.create(action.payload);
      }

      return initialState;
    }
  }), initialState
);

export const actions = {
  getProfile,
  login,
  logout
};


