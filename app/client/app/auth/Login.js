import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from './authActions';
import { TextField } from 'redux-form-material-ui';
import { RaisedButton } from 'material-ui';
import bindFunctions from '../utils/bindFunctions';

class Login extends React.Component {
  constructor(props, content) {
    super(props, content);

    bindFunctions(this, ['handleFormSubmit']);
  }

  handleFormSubmit(formProps) {
    this.props.login(formProps);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          {this.renderAlert()}
          <div>
            <label>Username</label>
            <Field name="username" className="form-control" component={TextField} type="text" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" className="form-control" component={TextField} type="password" />
          </div>
          <RaisedButton
            type="submit"
            label="Login"
            primary={true}
            onTouchTap={handleSubmit(this.handleFormSubmit)}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

Login = reduxForm({
  form: 'login'
})(Login);

export default connect(mapStateToProps, { login })(Login);