/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AdminPortal from "./components/AdminPortal";

class App extends React.Component {

  render() {
    console.debug("Rendering App!");
    return (
      <AdminPortal/>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('react'));
