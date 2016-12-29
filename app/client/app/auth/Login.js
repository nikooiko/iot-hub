import React from 'react';
import { connect } from 'react-redux';
import { login } from './authActions';
import LoginForm from 'grommet/components/LoginForm';
import Anchor from 'grommet/components/Anchor';

class Login extends React.Component {
  render() {
    return (
      <LoginForm
        onSubmit={(formProps) => this.props.login(formProps)}
        forgotPassword={<Anchor href="#" label="Forgot password?" />}
        rememberMe={true}
        usernameType="text"
      />
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { login })(Login);
