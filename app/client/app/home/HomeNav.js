import React from 'react';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import LoginIcon from 'grommet/components/icons/base/Login';
import RegisterIcon from 'grommet/components/icons/base/UserAdd';
import AuthIcon from 'grommet/components/icons/base/UserAdmin';
import { loginRoute, registerRoute } from '../auth/authConfig';
import NavLogo from '../navigation/NavLogo';

// TODO report bug with Auth Menu

class HomeNav extends React.Component {
  render() {
    return (
      <Header
        size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='neutral-1'
      >
        <Anchor path={'/'}>
          <NavLogo color='white'/>
        </Anchor>
        <Box className='hide-portable' direction='row' pad={{ between: 'medium' }}>
          <Anchor label='Page1' path={'/'} animateIcon={true}/>
          <Anchor label='Page2' path={'/'} animateIcon={true}/>
        </Box>
        <Box direction='row' justify='end' flex={true} responsive={false}>
          <Menu
            direction='row' inline={true} pad={{ between: 'medium' }}
            className='hide-portable'
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
          <Menu
            colorIndex='neutral-1-a' dropAlign={{ right: 'right' }} icon={<AuthIcon/>}
            className='show-portable'
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
        </Box>
      </Header>
    )
  }
}
export default HomeNav;