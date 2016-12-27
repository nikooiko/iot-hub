import React from 'react';
import cookies from 'react-cookie';
import { testToken } from '../auth/authActions';

import LoadingPage from '../pages/LoadingPage';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Sidebar from '../layout/Siderbar';



class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    const { store } = this.context;
    const appState = store.getState();
    const token = cookies.load('token');
    let promise = Promise.resolve();
    if (token && !appState.auth.authenticated) { // TODO maybe also recheck token either way?
      promise = store.dispatch(
        testToken()
      )
    }
    promise
      .then(() => {
        this.setState({ isReady: true });
      });
  }

  render() {
    let content;
    if (!this.state.isReady) {
       content = (
         <div>
          <LoadingPage />
         </div>
       );
    } else {
      content = (
        <div className="container">
          <Header/>
          <Sidebar/>
          <div className="content">
            {this.props.children}
          </div>
          <Footer/>
        </div>
      )
    }
    return content;
  }
}

App.contextTypes = {
  store: React.PropTypes.object
};

export default App;
