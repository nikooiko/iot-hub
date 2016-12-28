import React from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui';
import { Link } from 'react-router';
import SidebarButton from '../sidebar/SidebarButton';
import RightToolBar from './RightToolBar';

class Navbar extends React.Component {
  render() {
    const imgUrl = '/static/IotHub-logo.png';
    return (
      <Toolbar className='navbar' style={{ padding: '0' }}>
        <ToolbarGroup>
          <SidebarButton/>
        </ToolbarGroup>
        <ToolbarGroup>
          <Link to={'/'}>
            <img src={imgUrl} className='logo' width='200px' height='50px'/>
          </Link>
        </ToolbarGroup>
        <ToolbarGroup>
          <RightToolBar />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default Navbar;
