import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TheHeader from './TheHeader';
import PublicHomeView from '../pages/PublicHomeView';
import UserHomeView from '../pages/UserHomeView';
import AdminPortal from '../pages/AdminView';
import QueryView from '../pages/QueryView';
import TheFooter from './TheFooter';
import { lightTheme, darkTheme } from '../ui/theme';

function MainLayout(props) {
  const { classes } = props;

  const currentTheme = props.currentTheme === 'light' ? lightTheme : darkTheme;

  const SHOW_FOOTER = false;

  return (
    <div>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />
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
                  props.auth ? (
                    props.isAdmin ? (
                      <AdminPortal />
                    ) : (
                      <UserHomeView />
                    )
                  ) : (
                    <PublicHomeView />
                  )
                }
              />
            </Switch>
          </div>
          {SHOW_FOOTER && <TheFooter />}
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  isAdmin: state.authentication.isAdmin,
  currentTheme: state.views.currentTheme
});

export default connect(mapStateToProps)(withStyles(styles)(MainLayout));
