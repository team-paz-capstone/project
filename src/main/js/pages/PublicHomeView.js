import React from 'react';
import {connect} from 'react-redux'
import LoginForm from "../components/LoginForm"
import Container from "@material-ui/core/Container";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import RegisterForm from "../components/RegisterForm"
import AccountRecovery from "../components/AccountRecoveryForm";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import PasswordResetForm from "../components/PasswordResetForm";

const useStyles = makeStyles(theme => ({
  paper: {
    ...theme.paper,
    color: theme.palette.text.secondary,
  }
}));

function UserPortal(props) {
  const classes = useStyles();
  return (
      <Container maxWidth="sm">
        <Paper className={classes.paper}
               bgcolor="primary.main"
               color="primary.contrastText"
               p={2} m={1}>
          <h2>Welcome {name}!</h2>
        </Paper>
        <BrowserRouter>
          <Route
              exact
              path="/"
              component={LoginForm}
          />
          <Route
              exact
              path="/register"
              component={RegisterForm}
          />
          <Route
              path="/password-reset"
              component={PasswordResetForm}
          />
          <Route
              exact
              path="/account-recovery"
              component={AccountRecovery}
          />
        </BrowserRouter>
      </Container>
  );

}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(UserPortal)
