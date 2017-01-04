import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import AppHeader from './layout/AppHeader';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box>
        <AppHeader page='Dashboard'/>
        <hr/>
        Dashboard (PROTECTED):
      </Box>
    );
  }
}

export default Dashboard;
