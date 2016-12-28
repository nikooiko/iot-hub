import React from 'react';
import { render } from 'react-dom';
import Root from './generic/Root';

import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './generic/configureStore';

// Import stylesheets like this, if you choose: import './public/stylesheets/base.scss';
import './base.scss';

// Needed for onTouchTap
// TODO delete when unneeded
injectTapEventPlugin();

const store = configureStore();

// Render the Root component
render(
  <Root store={store}/>
  , document.getElementById('root')
);
