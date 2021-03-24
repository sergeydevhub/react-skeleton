import { ConnectedProps } from "react-redux";
import { connector } from './login-form.container';

export type ComponentProps = & ConnectedProps<typeof connector>;

export interface FormValues {
  email: string;
  password: string;
}

export type ComponentState = FormValues & {};
