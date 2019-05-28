import {
  fetchAwards,
  fetchAwardTypes,
  fetchOffices,
  fetchUsers
} from "../actions";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import BaseError from "./BaseError";
import TheAwardForm from "./TheAwardForm";

class TheUserDashboard extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwards());
    this.props.dispatch(fetchAwardTypes());
    this.props.dispatch(fetchOffices());
  }

  render() {
    let error = this.props.users.error +
        this.props.awards.error +
        this.props.awardTypes.error +
        this.props.offices.error;
    let loggedInUser = this.props.select.items["Logged In As"];
    let name = loggedInUser ? loggedInUser["display"]: "Invalid User Logged In";
    return (
        <div>
          <BaseError error={error}/>
          <h1>Welcome {name}!</h1>
          <br/>
          <TheAwardForm/>
          <br/>
          <p>Users: {JSON.stringify(this.props.users.items)}</p>
          <p>Awards: {JSON.stringify(this.props.awards.items)}</p>
          <p>AwardTypes: {JSON.stringify(this.props.awardTypes.items)}</p>
          <p>Offices: {JSON.stringify(this.props.offices.items)}</p>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authentication: state.authentication,
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(TheUserDashboard)
