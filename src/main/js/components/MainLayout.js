import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import TheHeader from './TheHeader';
import PublicHomePage from '../pages/PublicHomeView';
import UserDashboard from '../pages/UserHomeView';
import AdminPortal from '../pages/AdminView';
import QueryView from '../pages/QueryView';
import TheFooter from "./TheFooter"
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  root: {
    padding: 20,
  },
  main: {
    display: 'flex',
    minHeight: 'calc(100vh - 15em)',
    flexDirection: 'column',
  },
});

function MainLayout(props) {
  const {classes} = props;
  return (
      <div>
        <TheHeader/>
        <div className={classes.main}>
          <BrowserRouter>
            {/* If we are not logged in, redirect to home */}
            <Route
                exact
                path="/"
                render={() => (props.auth ? <UserDashboard/> : <PublicHomePage/>)}
            />

            {/* If the user isn't logged in, they will be redirected */}
            <Route
                exact
                path="/admin"
                render={() => (props.auth ? <AdminPortal/> : <Redirect to="/"/>)}
            />

            {/* If the user isn't logged in, they will be redirected */}
            <Route
                exact
                path="/query"
                render={() => (props.auth ? <QueryView/> : <Redirect to="/"/>)}
            />
          </BrowserRouter>
        </div>
        <TheFooter/>
      </div>
  );

}

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(withStyles(styles)(MainLayout));
