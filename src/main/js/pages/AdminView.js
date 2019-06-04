import 'babel-polyfill';
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import BaseLoadingBar from '../components/BaseLoadingBar';
import UserList from '../components/UserList';
import OfficeList from '../components/OfficeList';
import { fetchOffices, fetchUsers, setAdminViewOffices, setAdminViewUsers } from '../actions';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickViewUsers = this.handleClickViewUsers.bind(this);
    this.handleClickViewOffices = this.handleClickViewOffices.bind(this);
  }

  // fetch data from redux store
  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchOffices());
  }

  handleClickViewUsers() {
    this.props.dispatch(setAdminViewUsers());
  }

  handleClickViewOffices() {
    this.props.dispatch(setAdminViewOffices());
  }

  render() {
    const viewUserList = this.props.views.currentAdminView === 'users';
    const finishedLoadingData = !this.props.users.loading && !this.props.offices.loading;
    const users = this.props.users.items;
    const offices = this.props.offices.items;

    let title;
    let viewButton;
    let addButton;
    let list;

    if (viewUserList) {
      title = <Typography variant="h5">Admin Portal: users</Typography>;

      viewButton = (
        <Button color="primary" variant="contained" onClick={this.handleClickViewOffices}>
          View Offices
        </Button>
      );

      addButton = (
        <Button color="primary" variant="contained" href="/users/addForm">
          Add User
        </Button>
      );

      list = <UserList users={users} />;
    } else {
      title = <Typography variant="h5">Admin Portal: offices</Typography>;

      viewButton = (
        <Button color="primary" variant="contained" onClick={this.handleClickViewUsers}>
          View Users
        </Button>
      );

      addButton = (
        <Button color="primary" variant="contained" href="/offices/addForm">
          Add Office
        </Button>
      );

      list = <OfficeList offices={offices} />;
    }

    const queryButton = (
      <Button color="primary" variant="contained" href="/query">
        View Queries
      </Button>
    );

    return (
      <React.Fragment>
        {/* rendering a loading animation if data has not finished loading */}
        {finishedLoadingData === false && <BaseLoadingBar />}

        {/* only load the page if data has finished loading */}
        {finishedLoadingData && (
          <Grid container direction="row" justify="center" alignItems="center">
            <div>
              <br />
              {title}

              <br />
              {viewButton}
              <br />

              <br />
              {addButton}
              <br />

              <br />
              {queryButton}
              <br />

              <br />
              {list}

              <br />
              <br />
              <br />
            </div>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  offices: state.offices,
  views: state.views
});

export default connect(mapStateToProps)(AdminView);
