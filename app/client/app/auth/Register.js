import React from 'react';
import { connect } from 'react-redux';
import { register } from './authActions';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import TextInput from 'grommet/components/TextInput';

class Register extends React.Component {
  render() {
    return (
      <Form
        pad={{ horizontal: 'medium', vertical: 'large' }}
        onSubmit={(formProps) => this.props.register(formProps)}
      >
        <FormFields>
          <FormField label='Username' htmlFor='username'>
            <TextInput id='username' name='Username'/>
          </FormField>
          <FormField label='Password' htmlFor='password'>
            <input id='password' ref='password' type='password' />
          </FormField>
        </FormFields>
        <Footer pad={{"vertical": "medium"}}>
          <Button
            fill={true}
            onClick={() => {}}
            align='center'
            label='Submit'
            type='submit'
            primary={true}
          />
        </Footer>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.error,
  message: state.auth.message
});

export default connect(mapStateToProps, { register })(Register);
