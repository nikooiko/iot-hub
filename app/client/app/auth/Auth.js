import React from 'react';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Columns from 'grommet/components/Columns';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import { loginRoute, registerRoute } from './authConfig';

class Auth extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    const imgUrl = '/static/IotHub-logo.png';
    return (
      <Columns size='medium' justify='center' masonry='true'>
        <Box align='center' full='true'>
          <Hero background={<Image src={imgUrl} full={true} />}
                backgroundColorIndex='dark'
                size='small' />
        </Box>
        <Box align='center' full='true'>
          <Tabs activeIndex={0}>
            <Tab title='Login' onTouchTap={() => this.context.router.push(loginRoute)}>
              {this.props.children}
            </Tab>
            <Tab title='Register' onTouchTap={() => this.context.router.push(registerRoute)}>
            </Tab>
          </Tabs>
        </Box>
      </Columns>
    );
  }
}

export default Auth;
