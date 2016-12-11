import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Logout from './auth/logout.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Dashboard (PROTECTED):
        <Logout />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
