/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */

import 'babel-polyfill';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import red from '@material-ui/core/colors/red';
import AppBarImplemented from './components/AppBarImplemented';
import AdminPortal from './components/AdminPortal';
import UserPortal from './components/UserPortal';
import QueryPage from './components/QueryPage';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'

const middleware = [thunk];
middleware.push(createLogger());

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

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

  <Provider store={store}>
  <div>
        {/* allow customize theme color */}
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <AppBarImplemented />
          <BrowserRouter>
            <Route exact path="/" component={UserPortal} />
            <Route path="/admin" component={AdminPortal} />
            <Route path="/query" component={QueryPage} />
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
  </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react'));
