import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import routes from './routes';

const onUpdate = () => {
  window.scrollTo(0, 0);
};

// Render Theme >> Provider >> Router
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)} onUpdate={onUpdate}/>
  </Provider>
);

export default Root;