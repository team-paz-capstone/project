import React, {Component} from 'react';
import {connect} from 'react-redux'
import LoginForm from "../components/LoginForm"
import Container from "@material-ui/core/Container";

class UserPortal extends Component {

  render() {
    return (
        <Container maxWidth="sm">
          <LoginForm/>
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(UserPortal)
