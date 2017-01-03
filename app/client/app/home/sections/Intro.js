import React from 'react';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';
import HomeLogo from '../HomeLogo';

class Intro extends React.Component {
  render() {
    return (
      <Box flex={true} responsive={false}>
        <Box direction='row' flex={true} justify='center'>
          <Box basis='2/3' justify='center' pad={{ vertical: 'large' }}>
            <Box basis='2/3' justify='end' pad={{ vertical: 'large' }} align='center'>
              <Box justify='center' direction='row' flex={true}>
                <HomeLogo/>
              </Box>
            </Box>
            <Box basis='1/3' justify='start' >
              <Headline className='intro-title' strong={true}>
                Information on tap
              </Headline>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}
export default Intro;