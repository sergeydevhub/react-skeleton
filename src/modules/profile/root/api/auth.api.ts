import { LoginDTO } from "./login.dto";
import { LogoutDTO } from "./logout.dto";
import { TResources, TEndpoint } from "@core/transport";
import { TriggeredAction } from "@core/helpers/redux/actions";

export const login: TEndpoint = (action: TriggeredAction<LoginDTO>, resource: TResources = 'auth') => `${resource}/login`;
export const logout: TEndpoint = (action: TriggeredAction<LogoutDTO>, resource: TResources = 'auth') => `${resource}/logout`;
