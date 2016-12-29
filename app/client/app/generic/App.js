import React from 'react';
import { testIfAuthenticated } from '../auth/authActions';
import GrommetApp from 'grommet/components/App';

import LoadingPage from '../pages/LoadingPage';



class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    const { store } = this.context;
    store.dispatch(testIfAuthenticated())
      .then(() => {
        this.setState({ isReady: true });
      });
  }

  render() {
    let content;
    if (!this.state.isReady) {
       content = <LoadingPage />;
    } else {
      content = this.props.children;
    }
    return (
      <GrommetApp>
        {content}
      </GrommetApp>
    );
  }
}

App.contextTypes = {
  store: React.PropTypes.object
};

export default App;
