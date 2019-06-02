import {
  fetchAwards,
  fetchAwardTypes,
  fetchOffices,
  fetchUsers
} from "../actions";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import TheAwardForm from "./TheAwardForm";
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core";


const styles = {
  Container: {
    padding: 1,
  }
};

class TheUserDashboard extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwards());
    this.props.dispatch(fetchAwardTypes());
    this.props.dispatch(fetchOffices());
  }

  render() {
    let loggedInUser = this.props.select.items["Logged In As"];
    let name = loggedInUser ? loggedInUser["display"]: "Invalid User Logged In";
    return (
        <Container maxWidth="sm">
          <h2>Welcome {name}!</h2>
          <br/>
          <TheAwardForm/>
          <br/>
        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  select: state.select,
});

export default connect(mapStateToProps)(withStyles(styles)(TheUserDashboard))
