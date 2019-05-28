import React, {Component} from 'react';
import {connect} from 'react-redux'

class UserPortal extends Component {

  render() {
    return (
        <div>
          <h1>Welcome!</h1>
          <p>You are not logged in!</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(UserPortal)
