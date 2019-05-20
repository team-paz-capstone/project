/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */

import 'babel-polyfill';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import AdminPortal from "./components/AdminPortal";
import UserPortal from "./components/UserPortal";

class App extends React.Component {

  render() {
    console.debug("Rendering App!");
    return (
      <BrowserRouter>
        <Route path='/admin' component={AdminPortal} />
        <Route exact path='/' component={UserPortal} />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('react'));
