import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Navbar from '../navigation/Navbar';

export class Devices extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <Navbar page='Devices'/>
        Devices:
      </Box>
    );
  }
}

export default Devices;
