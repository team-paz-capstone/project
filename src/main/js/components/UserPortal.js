import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchUsers} from "../actions";

class UserPortal extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  render() {
    return (
        <div>
          <h1>Welcome!</h1>
          <p>Users: {JSON.stringify(this.props.users)}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  token: state.authentication.token,
  users: state.users.items
});

export default connect(mapStateToProps)(UserPortal)
