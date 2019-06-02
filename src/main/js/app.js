import 'babel-polyfill';
import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {blue, red} from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import Main from './components/Main';
import reducer from './reducers';

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

// setup the color for primary and secondary using theming
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  props: {
    Snackbar: {
      backgroundColor: red
    }
  },
  typography: {useNextVariants: true}
});

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            {/* allow customize theme color */}
            <CssBaseline/>
            <MuiThemeProvider theme={theme}>
              <Main/>
            </MuiThemeProvider>
          </div>
        </Provider>
    );
  }
}

export default App;
