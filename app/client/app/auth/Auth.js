import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Columns from 'grommet/components/Columns';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Article from 'grommet/components/Article';
import { Link } from 'react-router';
import { loginRoute, registerRoute } from './authConfig';

class Auth extends React.Component {
  // Used to load router to props
  static contextTypes = {
    router: React.PropTypes.object
  };

  render() {
    const currentUrl = location && location.pathname;
    const imgUrl = '/static/IotHub-logo.png';
    return (
      <Article>
        <Columns size='small' justify='center' masonry={true}>
          <Box align='center'>
            <Link to={'/'}>
              <Hero
                background={<Image src={imgUrl} full={true} />}
                backgroundColorIndex='dark'
                size='small'
              />
            </Link>
          </Box>
          <Box align='center'>
            <Tabs activeIndex={(currentUrl === loginRoute) ? 0 : 1} responsive={false}>
              <Tab title='Login' onTouchTap={() => this.context.router.push(loginRoute)}>
              </Tab>
              <Tab title='Register' onTouchTap={() => this.context.router.push(registerRoute)}>
              </Tab>
            </Tabs>
          </Box>
          <Box align='center'>
            {this.props.children}
          </Box>
        </Columns>
      </Article>
    );
  }
}

const mapStateToProps = (state) => ({
  location: state.routing.location
});

export default connect(mapStateToProps)(Auth);
