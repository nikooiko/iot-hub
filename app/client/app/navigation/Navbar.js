import React from 'react';
import SidebarButton from './sidebar/SidebarButton';
import SessionMenu from '../auth/SessionMenu';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';

class Navbar extends React.Component {
  render() {
    return (
      <Header
        size='large' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='light-2'
      >
        <SidebarButton/>
        <Box justify='end' direction='row' responsive={false} flex={true}>
          <SessionMenu/>
        </Box>
      </Header>
    )
  }
}

export default Navbar;
