import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Navbar from './navigation/Navbar';

export class Dashboard extends React.Component {
  render() {
    return (
      <Box>
        <Navbar page='Dashboard'/>
        Dashboard (PROTECTED):
      </Box>
    );
  }
}

export default Dashboard;
