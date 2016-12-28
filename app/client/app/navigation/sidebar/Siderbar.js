import React from 'react';
import { connect } from 'react-redux';
import { Drawer, MenuItem } from 'material-ui';
import { Link } from 'react-router';
import { Icon } from 'react-fa';
import muiThemeable from 'material-ui/styles/muiThemeable';

let drawerContainerStyle = {};

const itemIconStyle = {
  height: '40px',
  width: '40px',
  display: 'block',
  position: 'absolute',
  top: '-4.5px',
  margin: '12px',
  left: '4px',
  fontSize: '40px'
};

let activeStyle = {};

const drawerWidth = 200;

class Sidebar extends React.Component {
  componentDidMount() {
    const primary1Color = this.props.muiTheme.palette.primary1Color;
    const alternateTextColor = this.props.muiTheme.palette.alternateTextColor;
    const toolbarHeight = this.props.muiTheme.toolbar.height;

    drawerContainerStyle = {
      position: 'absolute',
      top: `${toolbarHeight}px`,
      height: `calc(100% - ${toolbarHeight}px)`
    };
    activeStyle = {
      backgroundColor: primary1Color,
      textColor: alternateTextColor,
      color: alternateTextColor
    };
  }

  render() {
    const currentUrl = location && location.pathname;
    return (
      <Drawer
        open={this.props.opened}
        containerStyle={drawerContainerStyle}
        width={drawerWidth}
      >
        <MenuItem
          leftIcon={<Icon name='home' size='lg' style={itemIconStyle}/>}
          primaryText='Home'
          containerElement={<Link to='/'/>}
          style={(currentUrl == '/') ? activeStyle : {}}
        />
        <MenuItem
          leftIcon={<Icon name='tachometer' size='lg' style={itemIconStyle} />}
          primaryText='Dashboard'
          containerElement={<Link to='/dashboard'/>}
          style={(currentUrl == '/dashboard') ? activeStyle : {}}
        />
      </Drawer>
    )
  }
}

const mapStateToProps = (state) => ({
  opened: state.sidebar.opened,
  location: state.routing.location
});

export default connect(mapStateToProps)(muiThemeable()(Sidebar));
