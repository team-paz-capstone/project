import 'babel-polyfill';
import { hot } from 'react-hot-loader';
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import localStorage from 'local-storage';
import Grid from '@material-ui/core/Grid';
import { getAllOffices } from '../api/office';
import { getAllUsers } from '../api/user';
import BaseLoadingBar from './BaseLoadingBar';
import UserList from './UserList';
import OfficeList from './OfficeList';

class AdminPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      offices: [],
      finishedLoadingData: false,
      viewUserList: true
    };

    this.handleClickViewUsers = this.handleClickViewUsers.bind(this);
    this.handleClickViewOffices = this.handleClickViewOffices.bind(this);
  }

  // noinspection JSCheckFunctionSignatures
  async componentDidMount() {
    try {
      // check if there is local storage for current view of the page
      let viewUserList = true;
      if (localStorage('viewUserList') !== null && localStorage('viewUserList') === false) {
        viewUserList = false;
      }
      console.debug('TEST');
      console.debug(`viewUserList: ${localStorage('viewUserList')}`);

      this.setState({ viewUserList });

      // load user data
      let response = await getAllUsers();
      const users = response.data;
      this.setState({ users });

      // load office data
      response = await getAllOffices();
      const offices = response.data;
      this.setState({ offices });

      // data loading is finished
      this.setState({ finishedLoadingData: true });
    } catch (error) {
      console.warn('Failed  to load users/offices!');
    }
  }

  handleClickViewUsers() {
    this.setState({
      viewUserList: true
    });

    // allow state to persist using local session
    // so that page refresh doesn't reset the current view of the page
    localStorage('viewUserList', 'true');
  }

  handleClickViewOffices() {
    this.setState({
      viewUserList: false
    });

    // allow state to persist using local session
    // so that page refresh doesn't reset the current view of the page
    localStorage('viewUserList', 'false');
  }

  render() {
    const { viewUserList, offices, users, finishedLoadingData } = this.state;

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

export default hot(module)(AdminPortal);
