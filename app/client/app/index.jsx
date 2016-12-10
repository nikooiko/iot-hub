'use strict';

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// TODO delete when unneeded
injectTapEventPlugin();


import LikeComponent from './LikeComponent.jsx';

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <LikeComponent prevLikes="10" />
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));
