import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import TheHeader from './TheHeader';
import PublicHomeView from '../pages/PublicHomeView';
import UserHomeView from '../pages/UserHomeView';
import AdminPortal from '../pages/AdminView';
import QueryView from '../pages/QueryView';
import TheFooter from './TheFooter';

const styles = theme => ({
  root: {
    padding: 20
  },
  main: {
    display: 'flex',
    minHeight: 'calc(100vh - 15em)',
    flexDirection: 'column'
  }
});

function MainLayout(props) {
  const { classes } = props;

  return (
    <div>
      <BrowserRouter>
        <TheHeader />
        <div className={classes.main}>
          <Switch>
            {/* If the user isn't logged in, they will be redirected */}
            <Route
              exact
              path="/admin"
              render={() => (props.auth ? <AdminPortal /> : <Redirect to="/" />)}
            />

            {/* If the user isn't logged in, they will be redirected */}
            <Route
              exact
              path="/query"
              render={() => (props.auth ? <QueryView /> : <Redirect to="/" />)}
            />
            {/* If we are not logged in, redirect to home */}
            <Route
              render={() =>
                props.auth ? props.isAdmin ? <AdminPortal /> : <UserHomeView /> : <PublicHomeView />
              }
            />
          </Switch>
        </div>
        <TheFooter />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  isAdmin: state.authentication.isAdmin
});

export default connect(mapStateToProps)(withStyles(styles)(MainLayout));
