import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';
import { connect } from 'react-redux';
import { logout } from './authActions';

class Logout extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout () {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Logout"
          secondary={true}
          onTouchTap={() => this.onLogout()}
          icon={<LogoutIcon />}
        />
      </div>
    );
  }

}

export default connect()(Logout);