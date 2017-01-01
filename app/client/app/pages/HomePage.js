import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import LoginIcon from 'grommet/components/icons/base/Login';
import RegisterIcon from 'grommet/components/icons/base/UserAdd';
import { loginRoute, registerRoute } from '../auth/authConfig';

class HomePage extends React.Component {
  render() {
    return (
      <Box>
        Home
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
      </Box>
    )
  }
}
export default HomePage;