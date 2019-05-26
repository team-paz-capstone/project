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

const middleware = [thunk];
middleware.push(createLogger());

const store = createStore(reducer, applyMiddleware(...middleware));

// setup the color for primary and secondary using theming
const theme = createMuiTheme(
    {
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
    }
);

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
