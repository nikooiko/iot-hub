import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import routes from './routes';

const logoColors = {
  cyan: '#00839E',
  red: '#ED1F24',
  green: '#5EBB49'
};

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