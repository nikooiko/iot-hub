import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import { register } from './authActions';
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

class Register extends React.Component {
  constructor(props, content) {
    super(props, content);

    bindFunctions(this, ['handleFormSubmit']);
  }

  handleFormSubmit(formProps) {
    this.props.register(formProps);
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
        <div>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div>
              <Field
                name='username'
                className='form-control'
                component={TextField}
                type='text'
                floatingLabelText='Username'
              />
            </div>
            <div>
              <Field
                name='password'
                className='form-control'
                component={TextField}
                type='password'
                floatingLabelText='Password'
              />
            </div>
            <div>
              <RaisedButton
                type='submit'
                label='Register'
                primary={true}
                onTouchTap={handleSubmit(this.handleFormSubmit)}
                className='flex'
              />
            </div>
          </form>
        </div>
        <hr/>
        <div>
          <Link to='/login'>
            <RaisedButton
              label='Login'
              secondary={true}
              style={{ width: '100%' }}
            />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

Register = reduxForm({
  form: 'loginForm',
  validate,
  asyncValidate
})(Register);

export default connect(mapStateToProps, { register })(Register);
