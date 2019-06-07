import 'babel-polyfill';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';
import MainLayout from './components/MainLayout';
import reducer from './reducers';
import { theme } from './ui/theme';

let store;

// save/load athentication redux state to/from local storage
// this is needed to allow thymleaf pages to work with redux
const save_state_to_localstorage = save({ states: ['authentication', 'views'] });
const load_state_from_localstorage = load({ states: ['authentication', 'views'] });

const middleware = [thunk, save_state_to_localstorage];
if (process.env.NODE_ENV === 'development') {
  console.warn('Using Redux logger in development. Expect lower performance');
  middleware.push(createLogger());
}
store = createStore(
  reducer,
  load_state_from_localstorage,
  composeWithDevTools(applyMiddleware(...middleware))
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {/* allow customize theme color */}
          <MuiThemeProvider theme={theme}>
            <CssBaseline />

            <MainLayout />
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
