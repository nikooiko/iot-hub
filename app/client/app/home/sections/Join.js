import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Value from 'grommet/components/Value';
import Anchor from 'grommet/components/Anchor';
import RegisterIcon from 'grommet/components/icons/base/UserAdd';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import ConnectIcon from 'grommet/components/icons/base/Connect';
import DeliverIcon from 'grommet/components/icons/base/Deliver';

import { registerRoute } from '../../auth/authConfig';

class Join extends React.Component {
  render() {
    let headlineSize = 'medium';
    let stepSize = 'large';
    let stepPad = 'medium';
    let containerPad = 'large';
    // Calculate Responsive values
    const mediaType = this.props.mediaType;
    if (mediaType === 'palm') {
      stepSize = 'small';
      stepPad = 'small';
      containerPad = 'small';
      headlineSize = 'small';
    } else if (mediaType === 'lapAndUp') {
      stepSize = 'large';
      containerPad = 'medium';
    }

    return (
      <Box flex={true} responsive={false} pad={containerPad} justify='center'>
        <Headline strong={true} size={headlineSize}>
          Join Our Community
        </Headline>
        <Tiles
          flush={true} size='small' justify='center' responsive={false}
        >
          <Tile pad={stepPad}>
            <Anchor path={registerRoute}>
              <Value
                value={1} units='.' trendIcon={<RegisterIcon size={stepSize}/>}
                label='Create Account' size={stepSize}
              />
            </Anchor>
          </Tile>
          <Tile pad={stepPad}>
            <Value
              value={2} units='.' trendIcon={<DeployIcon size={stepSize}/>}
              label='Deploy Sensors' size={stepSize}
            />
          </Tile>
          <Tile pad={stepPad}>
            <Value
              value={3} units='.' trendIcon={<ConnectIcon size={stepSize}/>}
              label='Connect with IOTHub' size={stepSize}
            />
          </Tile>
          <Tile pad={stepPad}>
            <Value
              value={4} units='.' trendIcon={<DeliverIcon size={stepSize}/>}
              label='Receive your data' size={stepSize}
            />
          </Tile>
        </Tiles>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  mediaType: state.browser.mediaType
});

export default connect(mapStateToProps)(Join);;