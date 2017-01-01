import React from 'react';
import Article from 'grommet/components/Article';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import LoginIcon from 'grommet/components/icons/base/Login';
import UserIcon from 'grommet/components/icons/base/User';
import RegisterIcon from 'grommet/components/icons/base/UserAdd';
import { loginRoute, registerRoute } from '../auth/authConfig';
import NavLogo from '../navigation/NavLogo';

class Home extends React.Component {
  render() {
    return (
      <Article colorIndex='light-2' full={true}>
        <Header
          size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
          colorIndex='neutral-1'
        >
          <NavLogo color='white'/>
          <Box direction='row' justify='end' responsive={false} flex={true}>
            <Menu
              icon={<UserIcon/>} dropAlign={{ right: 'right' }} colorIndex='neutral-1-a'
              pad={{ between: 'medium' }} inline={true} direction='row'
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
      </Article>
    )
  }
}
export default Home;