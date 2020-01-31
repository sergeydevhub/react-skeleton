import ReduxTypes from 'ReduxTypes';
import { connect } from 'react-redux';
import { actions } from '@core/modules/profile/account';
import { selectors } from '@core/modules/profile/root';
import { LoginFormComponent } from './login-form.component';

const mapStateToProps = (state: ReduxTypes.RootState) => {
  return {
    status: selectors.getStatus(state)
  }
};

const mapDispatchToProps = {
  ...actions
};

export const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(LoginFormComponent);
