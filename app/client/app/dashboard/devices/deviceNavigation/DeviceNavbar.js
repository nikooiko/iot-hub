import React from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';

import BackButton from './BackButton';
import DeviceActions from '../device/DeviceActions';

class DeviceNavbar extends React.Component {
  render() {
    const { status, deviceId } = this.props;

    return (
      <Header
        size='medium' pad={{ horizontal: 'medium', between: 'medium' }}
        colorIndex='grey-5'
      >
        <BackButton/>
        <Box justify='end' direction='row' responsive={false} flex={true}>
          <DeviceActions status={status} deviceId={deviceId} />
        </Box>
      </Header>
    )
  }
}

export default DeviceNavbar;
