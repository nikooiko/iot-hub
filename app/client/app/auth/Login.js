import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from './authActions';
import { TextField, Checkbox } from 'redux-form-material-ui';
import { RaisedButton } from 'material-ui';
import bindFunctions from '../utils/bindFunctions';

const asyncValidate = (values) => {
  return Promise.resolve();
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [ 'username', 'password' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  return errors
};

const renderTextField = (props) => (
  <TextField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
);

class Login extends React.Component {
  constructor(props, content) {
    super(props, content);

    bindFunctions(this, ['handleFormSubmit']);
  }

  handleFormSubmit(formProps) {
    this.props.login(formProps);
  }

  renderAlert() {
    if(this.props.error) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.error}</span>
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
            <Field
              name="username"
              className="form-control"
              component={TextField}
              type="text"
              floatingLabelText="Username"
            />
          </div>
          <div>
            <Field
              name="password"
              className="form-control"
              component={TextField}
              type="password"
              floatingLabelText="Password"
            />
          </div>
          <div>
            <Field
              name="rememberMe"
              label="RememberMe"
              component={Checkbox}
            />
          </div>
          <div>
            <RaisedButton
              type="submit"
              label="Login"
              primary={true}
              onTouchTap={handleSubmit(this.handleFormSubmit)}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

Login = reduxForm({
  form: 'loginForm',
  validate,
  asyncValidate
})(Login);

export default connect(mapStateToProps, { login })(Login);
