import { ConnectedProps } from "react-redux";
import { connector } from './login-form.container';

export type Props = & ConnectedProps<typeof connector>;
export type State = {};
