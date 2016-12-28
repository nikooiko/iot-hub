import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import routes from './routes';
import { colors } from 'material-ui/styles';

const logoColors = {
  cyan: '#00839E',
  red: '#ED1F24',
  green: '#5EBB49'
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: logoColors.cyan,
    primary2Color: logoColors.red,
    primary3Color: colors.lightBlueA100,
    accent1Color: logoColors.green,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: logoColors.cyan,
    alternateTextColor: colors.white,
    canvasColor: colors.grey100,
  },
  fontFamily: 'Roboto, sans-serif',
  toolbar: {
    height: 54
  },
});

const onUpdate = () => {
  window.scrollTo(0, 0);
};

// Render Theme >> Provider >> Router
const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes(store)} onUpdate={onUpdate}/>
    </Provider>
  </MuiThemeProvider>
);

export default Root;