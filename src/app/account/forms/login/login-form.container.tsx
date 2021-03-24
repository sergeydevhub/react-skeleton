import { connect } from 'react-redux';
import { actions } from '@modules/profile/root';
import LoginFormComponent from './login-form.component';

const mapDispatchToProps = {
  login: actions.login.triggered
};

export const connector = connect(null, mapDispatchToProps);


export default connector(LoginFormComponent);
