import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import TheHeader from './TheHeader';
import PublicHomePage from '../pages/PublicHomeView';
import UserDashboard from '../pages/UserHomeView';
import AdminPortal from '../pages/AdminView';
import QueryView from '../pages/QueryView';

class MainLayout extends Component {
  render() {
    return (
      <div>
        <TheHeader />
        <BrowserRouter>
          {/* If we are not logged in, redirect to home */}
          <Route
            exact
            path="/"
            render={() => (this.props.auth ? <UserDashboard /> : <PublicHomePage />)}
          />

          {/* If the user isn't logged in, they will be redirected */}
          <Route
            exact
            path="/admin"
            render={() => (this.props.auth ? <AdminPortal /> : <Redirect to="/" />)}
          />

          {/* If the user isn't logged in, they will be redirected */}
          <Route
            exact
            path="/query"
            render={() => (this.props.auth ? <QueryView /> : <Redirect to="/" />)}
          />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(MainLayout);
