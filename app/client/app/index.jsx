import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './store';
import routes from './routes';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';

// Needed for onTouchTap
// TODO delete when unneeded
injectTapEventPlugin();

const onUpdate = () => {window.scrollTo(0, 0); };

// Render Theme >> Provider >> Router
render((
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} onUpdate={onUpdate}/>
    </Provider>
  </MuiThemeProvider>
), document.getElementById('root'));
