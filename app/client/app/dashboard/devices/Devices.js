import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import AppHeader from '../layout/AppHeader';

export class Devices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <AppHeader page='Devices'/>
        <hr/>
        Devices:
      </Box>
    );
  }
}

export default Devices;
