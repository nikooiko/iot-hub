import React from 'react';
import { connect } from 'react-redux';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import Sidebar from 'grommet/components/Sidebar';
import CloseIcon from 'grommet/components/icons/base/Close'
import Anchor from 'grommet/components/Anchor';
import DashboardIcon from 'grommet/components/icons/base/Dashboard';
import DeviceIcon from 'grommet/components/icons/base/Robot';
import NavLogo from '../NavLogo';
import { closeSidebar } from './sidebarActions';
import bindFunctions from '../../../utils/bindFunctions';

class AppSidebar extends React.Component {
  constructor(props, content) {
    super(props, content);
    bindFunctions(this, ['_onClose']);
  }

  _onClose() {
    this.props.closeSidebar();
  }

  render() {
    if (!this.props.opened) {
      return null;
    }

    return (
      <Sidebar colorIndex='neutral-1' fixed={true} size={'medium'}>
        <Header
          size='medium' pad={{ horizontal: 'medium', between: 'medium' }} onClick={this._onClose}
        >
          <Button
            icon={<CloseIcon />}
            plain={true}
            a11yTitle='Close Sidebar'
            onClick={() => {}}
          />
          <Title a11yTitle='Close Sidebar'>
            <NavLogo color={'white'} />
          </Title>
        </Header>
        <Menu fill={true} primary={true}>
          <Anchor
            primary={false}
            path={'/dashboard'} label={'Dashboard'} animateIcon={true}
            icon={<DashboardIcon />}
          />
          <Anchor
            primary={false}
            path={'/devices'} label={'Devices'} animateIcon={true}
            icon={<DeviceIcon />}
          />
        </Menu>
      </Sidebar>
    )
  }
}

const mapStateToProps = (state) => ({
  opened: state.sidebar.opened
});

export default connect(mapStateToProps, { closeSidebar })(AppSidebar);
