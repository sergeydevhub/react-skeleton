import { Reducer } from 'redux';
import { FormikHelpers } from 'formik';
import * as ReduxTypes from 'ReduxTypes';
import { ObjectRepositoryHelper } from "@core/helpers/redux/state";
import { ReduxModuleHelper } from "@core/helpers/redux";
import { IProfile, ProfileEntity, ProfileRecord, TokenRecord} from "@modules/profile/root/data";
import { HTTPResponseException, AuthException } from '@core/exceptions/variations';
import { InstanceValidator } from "@core/validation";
import { InstanceConverter } from "@core/converters";
import { BaseAction, RootAction } from "@core/helpers/redux/actions";
import { LoginDTO, LogoutDTO } from "./api";

type TState = ProfileEntity | Partial<ProfileEntity>;

export const initialState: TState = {};

const profileModule = new ReduxModuleHelper<TState>('profile', ObjectRepositoryHelper);

const getProfile = profileModule.async<
  undefined,
  HTTPResponseException,
  ProfileEntity | TState
>(['get'], {
  successful: (actionCreator) => (record: unknown) => {
    const recordValidator = new InstanceValidator(ProfileRecord);

    if(recordValidator.isValid(record)) {
      const verified = record as ProfileRecord;
      const converter = new InstanceConverter<ProfileRecord, ProfileEntity>();
      const result = converter.to(verified, ProfileEntity);

      const entityValidator = new InstanceValidator(ProfileEntity);
      if(entityValidator.isValid(result)) {
        return actionCreator(result);
      }
    }

    return actionCreator(initialState);
  }
});

const login = profileModule.async<LoginDTO, AuthException, TokenRecord>(['login']);
const logout = profileModule.async<LogoutDTO, AuthException, any>(['logout']);

export const reducer: Reducer<TState, BaseAction> = profileModule.reducer(
  (repository: ObjectRepositoryHelper<TState>) => ({
    [getProfile.successful.type]: (
      state: TState = initialState, action: ReturnType<typeof getProfile.successful>
    ) => repository.create(action.payload)
  }), initialState);

export const actions = {
  getProfile,
  login,
  logout
};


