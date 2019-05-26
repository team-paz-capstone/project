import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchUsers, fetchAwardTypes} from "../actions";

class UserPortal extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwardTypes());
  }

  render() {
    return (
        <div>
          <h1>Welcome!</h1>
          <p>Users: {JSON.stringify(this.props.users)}</p>
          <p>AwardTypes: {JSON.stringify(this.props.awardTypes)}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  token: state.authentication.token,
  users: state.users.items,
  awardTypes: state.awardTypes.items
});

export default connect(mapStateToProps)(UserPortal)
