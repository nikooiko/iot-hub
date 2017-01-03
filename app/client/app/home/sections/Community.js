import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import WorldMap from 'grommet/components/WorldMap';
import Loading from '../../common/Loading';
import { requestUsersPerContinent } from '../store/homeActions';

class Community extends React.Component {
  constructor(props, content) {
    super(props, content);
  }

  componentDidMount() {
    this.props.requestUsersPerContinent()
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (!this.props.users) {
      return (
        <Loading/>
      )
    }
    const series = [];
    return (
      <Box flex={true}>
        <Box direction='row' flex={true} justify='center'>
          Community
          <WorldMap series={series} />
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.home.users
});

export default connect(mapStateToProps, {requestUsersPerContinent})(Community);