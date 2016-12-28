import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FlatButton, MenuItem, IconMenu, IconButton, Divider } from 'material-ui';
import { Icon } from 'react-fa';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { logout } from '../../auth/authActions';

const itemIconStyle = {
  margin: '12.5px 17px 17px 21px',
  fontSize: '30px'
};

let activeStyle = {};

class RightToolBar extends React.Component {
  componentDidMount() {
    const primary1Color = this.props.muiTheme.palette.primary1Color;
    const alternateTextColor = this.props.muiTheme.palette.alternateTextColor;

    activeStyle = {
      backgroundColor: primary1Color,
      textColor: alternateTextColor,
      color: alternateTextColor
    };
  }

  render() {
    const currentUrl = location && location.pathname;
    if (this.props.authenticated) {
      return (
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            leftIcon={<Icon name='user' size='lg' style={itemIconStyle} />}
            primaryText='Profile'
            containerElement={<Link to='/profile'/>}
            style={(currentUrl == '/profile') ? activeStyle : {}}
          />
          <Divider />
          <MenuItem
            leftIcon={<Icon name='power-off' size='lg' style={itemIconStyle} />}
            primaryText='Logout'
            onTouchTap={() => this.props.logout()}
          />
        </IconMenu>
      )
    }
    return (
      <div>
        <Link to={'/login'}><FlatButton label='Login'/></Link>
        <Link to={'/register'}><FlatButton label='Register'/></Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { logout })(muiThemeable()(RightToolBar));

