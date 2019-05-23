/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */

import 'babel-polyfill';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import AppBarImplemented from './components/AppBarImplemented';
import AdminPortal from './components/AdminPortal';
import UserPortal from './components/UserPortal';

// setup the color for primary and secondary using theming
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  typography: { useNextVariants: true }
});

class App extends React.Component {
  render() {
    console.debug('Rendering App!');
    return (
      <div>
        {/* allow customize theme color */}
        <MuiThemeProvider theme={theme}>
          <AppBarImplemented />
          <BrowserRouter>
            <Route path="/admin" component={AdminPortal} />
            <Route exact path="/" component={UserPortal} />
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
