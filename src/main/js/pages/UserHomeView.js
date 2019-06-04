import {
  fetchAwards,
  fetchAwardTypes,
  fetchOffices,
  fetchUsers
} from "../actions";
import React, {Component} from 'react';
import {connect} from 'react-redux'
import TheAwardForm from "../components/AwardForm";
import Container from '@material-ui/core/Container/index';
import {withStyles} from "@material-ui/core/index";


const styles = {Container: {padding: 1}};

class UserHomeView extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwards());
    this.props.dispatch(fetchAwardTypes());
    this.props.dispatch(fetchOffices());
  }

  render() {
    return (
        <Container maxWidth="sm">
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

export default connect(mapStateToProps)(withStyles(styles)(UserHomeView))
