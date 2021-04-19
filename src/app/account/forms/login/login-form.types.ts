import { ConnectedProps } from "react-redux";
import { TLoginDTO } from "@modules/profile/root/api/types";
import { connector } from './login-form.container';

export type TComponentProps = & ConnectedProps<typeof connector>;

export interface IFormValues extends TLoginDTO {}

export type TComponentState = IFormValues & {};
