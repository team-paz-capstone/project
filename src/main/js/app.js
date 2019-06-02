import 'babel-polyfill';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import Main from './components/Main';
import reducer from './reducers';
import {theme} from "./ui/theme"

let store;
if (process.env.NODE_ENV === 'development') {
  console.warn(
      "Using Redux logger in development. Expect lower performance");
  const middleware = [thunk];
  middleware.push(createLogger());
  store = createStore(reducer, applyMiddleware(...middleware));
} else {
  store = createStore(reducer);
}


class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            {/* allow customize theme color */}
            <MuiThemeProvider theme={theme}>
              <CssBaseline/>
              <Main/>
            </MuiThemeProvider>
          </div>
        </Provider>
    );
  }
}

export default App;
