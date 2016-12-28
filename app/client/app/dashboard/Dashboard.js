import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../auth/authActions';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Dashboard (PROTECTED):
        <Box direction="row"
             justify="start"
             align="center"
             wrap={true}
             pad="medium"
             margin="small"
             colorIndex="light-2"
        >
          <Value value={1}
                 colorIndex="accent-1" />
          <Box direction="row"
               justify="start"
               align="center"
               wrap={true}
               pad="medium"
               margin="small"
               colorIndex="light-1">
            <Value value={2} />
          </Box>
          <Box direction="row"
               justify="start"
               align="center"
               wrap={true}
               pad="medium"
               margin="small"
               colorIndex="light-1">
            <Value value={3} />
          </Box>
          <Box direction="row"
               justify="start"
               align="center"
               wrap={true}
               pad="medium"
               margin="small"
               colorIndex="light-1"
          >
            <Value value={4} />
          </Box>
          <Box direction="row"
               justify="start"
               align="center"
               wrap={true}
               pad="medium"
               margin="small"
               colorIndex="light-1">
            <Value value={5} />
          </Box>
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, actions)(Dashboard);
