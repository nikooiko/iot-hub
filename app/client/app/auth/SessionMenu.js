import React from 'react';
import UserIcon from 'grommet/components/icons/base/User';
import LoginIcon from 'grommet/components/icons/base/Login';
import RegisterIcon from 'grommet/components/icons/base/UserAdd';
import LogoutIcon from 'grommet/components/icons/base/Logout';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import { connect } from 'react-redux';
import { loginRoute, registerRoute } from './authConfig';
import { logout } from './authActions';

class UserMenu extends React.Component {
  render() {
    const auth = this.props.auth;
    if (auth.authenticated) {
      return (
        <Menu
          icon={<UserIcon/>}
          dropAlign={{ right: 'right' }}
          colorIndex='neutral-1-a'
        >
          <Anchor
            icon={<LogoutIcon />}
            label='Logout'
            animateIcon={true}
            onClick={() => this.props.logout()}
          />
        </Menu>
      )
    }
    return (
      <Menu
        icon={<UserIcon/>}
        dropAlign={{ right: 'right' }}
        colorIndex='neutral-1-a'
      >
        <Anchor
          icon={<LoginIcon />}
          label='Login'
          animateIcon={true}
          path={ loginRoute }
        />
        <Anchor
          icon={<RegisterIcon />}
          label='Register'
          animateIcon={true}
          path={ registerRoute }
        />
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(UserMenu);
