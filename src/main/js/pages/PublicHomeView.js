import React, {Component} from 'react';
import {connect} from 'react-redux'
import LoginForm from "../components/LoginForm"
import Container from "@material-ui/core/Container";
import {Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import RegisterForm from "../components/RegisterForm"
import AccountRecovery from "../components/AccountRecoveryForm";
class UserPortal extends Component {

  render() {
    return (
        <Container maxWidth="sm">
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
                exact
                path="/account-recovery"
                component={AccountRecovery}
            />
          </BrowserRouter>
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(UserPortal)
