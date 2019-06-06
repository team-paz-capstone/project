import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container/index';
import { withStyles } from '@material-ui/core/index';
import Grid from '@material-ui/core/Grid';
import DeleteAwardForm from '../components/AwardsGranted';
import CreateAwardForm from '../components/CreateAwardForm';
import { fetchAwards, fetchAwardTypes, fetchOffices, fetchUsers } from '../actions';
import { Route } from 'react-router';
import Profile from '../components/Profile';
import Button from '@material-ui/core/Button';

const styles = { Container: { padding: 1 } };

class UserHomeView extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAwards());
    this.props.dispatch(fetchAwardTypes());
    this.props.dispatch(fetchOffices());
  }

  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <br />
          <Route exact path="/home/profile" component={Profile} />
          <Route exact path="/home/" component={CreateAwardForm} />
          <Route exact path="/" component={CreateAwardForm} />
          <br />
        </Container>
        <Grid>
          <Route exact path="/home/" component={DeleteAwardForm} />
          <Route exact path="/" component={DeleteAwardForm} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  select: state.select
});

export default connect(mapStateToProps)(withStyles(styles)(UserHomeView));
