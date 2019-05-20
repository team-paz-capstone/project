/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */

import 'babel-polyfill';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import ReactDOM from 'react-dom';

import AppBarImplemented from "./components/AppBarImplemented"
import AdminPortal from "./components/AdminPortal";
import UserPortal from "./components/UserPortal";

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

// store.dispatch(getAllProducts()); // TODO: fetch all the users via dispatch

class App extends React.Component {

  render() {
    console.debug("Rendering App!");
    return (
      <Provider store={store}>
        {/*<p>{store.getState()}</p>*/}
        <div>
          <AppBarImplemented/>
          <BrowserRouter>
            <Route path='/admin' component={AdminPortal}/>
            <Route exact path='/' component={UserPortal}/>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('react'));
