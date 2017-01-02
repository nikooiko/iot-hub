import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import WorldMap from 'grommet/components/WorldMap';
import Loading from '../../common/Loading';
import { requestUsersPerContinent } from '../store/homeActions';

class Users extends React.Component {
  constructor(props, content) {
    super(props, content);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.requestUsersPerContinent()
      .then(() => {
        console.log('Eurika');
        this.setState({
          ...this.state,
          loading: false
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading/>
      )
    }
    const series = [];
    return (
      <Box flex={true}>
        <Box direction='row' flex={true} justify='center'>
          <WorldMap series={series} />
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.home.users
});

export default connect(mapStateToProps, {requestUsersPerContinent})(Users);