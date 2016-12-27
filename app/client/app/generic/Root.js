import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';

const onUpdate = () => {
  window.scrollTo(0, 0);
};

// Render Theme >> Provider >> Router
const Root = ({ store }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} onUpdate={onUpdate}/>
    </Provider>
  </MuiThemeProvider>
);

export default Root;