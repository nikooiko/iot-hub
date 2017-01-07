import React from 'react';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Box from 'grommet/components/Box';

import { testToken } from '../auth/store/authActions';
import { setApplicationIsReady } from './store/appActions';
import Loading from '../common/Loading';

class App extends React.Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.testToken()
        .then(() => {
          this.props.setApplicationIsReady(true);
        });
    } else {
      this.props.setApplicationIsReady(true);
    }
  }

  render() {
    let content;
    if (!this.props.app.isReady) {
       content = (
         <Box full={true}>
           <Loading />
         </Box>
       );
    } else {
      content = this.props.children;
    }
    return (
      <GrommetApp centered={false}>
        {content}
      </GrommetApp>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  app: state.app
});

export default connect(mapStateToProps, { setApplicationIsReady, testToken })(App);
