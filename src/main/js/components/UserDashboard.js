import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  fetchAwards,
  fetchAwardTypes,
  fetchOffices,
  fetchUsers
} from "../actions";

class UserDashboard extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwards());
    this.props.dispatch(fetchAwardTypes());
    this.props.dispatch(fetchOffices());
  }

  render() {
    return (
        <div>
          <h1>Welcome!</h1>
          <p>Users: {JSON.stringify(this.props.users)}</p>
          <p>Awards: {JSON.stringify(this.props.awards)}</p>
          <p>AwardTypes: {JSON.stringify(this.props.awardTypes)}</p>
          <p>Offices: {JSON.stringify(this.props.offices)}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  awards: state.awards.items,
  awardTypes: state.awardTypes.items,
  token: state.authentication.token,
  offices: state.offices.items,
  users: state.users.items,
});

export default connect(mapStateToProps)(UserDashboard)
