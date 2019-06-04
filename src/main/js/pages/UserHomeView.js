import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container/index';
import { withStyles } from '@material-ui/core/index';
import Grid from '@material-ui/core/Grid';
import DeleteAwardForm from '../components/DeleteAwardForm';
import TheAwardForm from '../components/CreateAwardForm';
import { fetchAwards, fetchAwardTypes, fetchOffices, fetchUsers } from '../actions';

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
          <TheAwardForm />
          <br />
        </Container>
        <Grid>
          <DeleteAwardForm />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  select: state.select
});

export default connect(mapStateToProps)(withStyles(styles)(UserHomeView));
