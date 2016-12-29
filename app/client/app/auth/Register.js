import React from 'react';
import { connect } from 'react-redux';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import { register } from './authActions';
import bindFunctions from '../utils/bindFunctions';
import MyForm from '../common/Form';

const formValidator = {
  username: {
    required: true
  },
  password: {
    required: true
  },
  'confirm-password': {
    required: true,
    shouldEqual: 'password'
  },
  continent: {
    required: true
  }
};

const continentOptions = ['Europe', 'Asia', 'Africa', 'North America', 'South America'];

class Register extends MyForm {
  constructor(props, content) {
    const fields = {
      username: '',
      password: '',
      'confirm-password': '',
      continent: '',
    };

    super(props, content, fields, formValidator);
    bindFunctions(this, ['_onSubmit']);
  }

  _onSubmit(event) {
    event.preventDefault();
    const newState = {...this.state};
    const form = newState.form;
    this.validateForm(form);
    if (Object.keys(form.errors).length !== 0) {
      this.setState(newState);
    } else {
      this.props.register(form.fields);
    }
  }

  render() {
    return (
      <Form
        pad={{ horizontal: 'medium', vertical: 'small' }}
        onSubmit={this._onSubmit}
      >
        <FormFields>
          {this.renderInputField('Username', 'username', 'text')}
          {this.renderInputField('Password', 'password', 'password')}
          {this.renderInputField('Confirm Password', 'confirm-password', 'password')}
          {this.renderSelectField('Continent', 'continent', continentOptions)}
        </FormFields>
        <Box pad={{ vertical: 'medium', between: 'medium' }}>
          <Button
            fill={true} align='center' label='Submit' type='submit' primary={true}
            onClick={this._onSubmit}
          />
        </Box>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default connect(mapStateToProps, { register })(Register);
