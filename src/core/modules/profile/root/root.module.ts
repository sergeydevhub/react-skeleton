import { ReduxModuleHelper } from "@core/helpers";
import StoreModels from 'StoreModels';
import ReduxTypes from "ReduxTypes";

class ProfileModule extends ReduxModuleHelper {}
const profileModule = new ProfileModule('profile');

const status: StoreModels.Profile["status"] = {
  isAuthenticated: false,
  isGuest: false,
  isSocial: false,
  isTriggered: false,
  isSuccessful: false,
  isFailure: false
};

const initialState: StoreModels.Profile = {
  id: '',
  nickname: '',
  firstName: '',
  lastName: '',
  age: 18,
  country: '',
  photoURL: '',
  authType: undefined,
  email: '',
  status
};

const getRoot = (state: ReduxTypes.RootState) => state.profile;
const getStatus = (state: ReduxTypes.RootState) => getRoot(state).status;

const selectors = {
  getRoot,
  getStatus
};

export {
  ProfileModule,
  profileModule,
  initialState,
  selectors
}
