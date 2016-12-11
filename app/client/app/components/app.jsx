import React from 'react';
import cookies from 'react-cookie';
import { testToken } from '../actions';
import store from '../store';
import LoadingPage from './pages/loading-page.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    const appState = store.getState();
    const token = cookies.load('token');
    if (token && !appState.auth.authenticated) { // TODO maybe also recheck token either way?
      store.dispatch(
        testToken()
      ).then(() => {
        this.setState({ isReady: true });
      });
    } else {
      this.setState({ isReady: true });
    }
  }
  render() {
    if (!this.state.isReady) {
      return <LoadingPage />;
    }
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default App;
