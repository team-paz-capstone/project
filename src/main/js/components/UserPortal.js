import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAwards, fetchAwardTypes, fetchUsers} from "../actions";

class UserPortal extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwards());
    this.props.dispatch(fetchAwardTypes());
  }

  render() {
    return (
        <div>
          <h1>Welcome!</h1>
          <p>Users: {JSON.stringify(this.props.users)}</p>
          <p>Awards: {JSON.stringify(this.props.awards)}</p>
          <p>AwardTypes: {JSON.stringify(this.props.awardTypes)}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  awards: state.awards.items,
  awardTypes: state.awardTypes.items,
  token: state.authentication.token,
  users: state.users.items,
});

export default connect(mapStateToProps)(UserPortal)
