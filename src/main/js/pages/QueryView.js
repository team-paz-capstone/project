import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, Label, CartesianGrid, Line } from 'recharts';
import 'babel-polyfill';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CSVLink } from 'react-csv';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import BaseLoadingBar from '../components/BaseLoadingBar';
import { fetchUserByAwardCount, fetchOfficeByUserCount } from '../actions';

// sort by count from largest to smallest
function Comparator(a, b) {
  if (a[1] < b[1]) return 1;
  if (a[1] > b[1]) return -1;
  return 0;
}

class QueryView extends Component {
  constructor(props) {
    super(props);
    this.renderOfficeByUserCountQuerySection = this.renderOfficeByUserCountQuerySection.bind(this);
    this.renderUserByAwardCountSection = this.renderUserByAwardCountSection.bind(this);
    this.transformOfficeByUserData = this.transformOfficeByUserData.bind(this);
    this.transformUserByAwardData = this.transformUserByAwardData.bind(this);
  }

  // fetch query data from redux
  componentDidMount() {
    this.props.dispatch(fetchUserByAwardCount());
    this.props.dispatch(fetchOfficeByUserCount());
  }

  // transform data from redux into a format can be used by the chart
  transformOfficeByUserData(data) {
    const officeByUserData = data;
    const officeByUserDataArray = Object.entries(officeByUserData).sort(Comparator);
    console.log(officeByUserDataArray);
    const officeByUserDataArrayTransformed = [];
    for (let i = 0; i < officeByUserDataArray.length; i += 1) {
      const officeName = officeByUserDataArray[i][0];
      const userCount = officeByUserDataArray[i][1];
      const entry = { office_name: officeName, user_count: userCount };
      officeByUserDataArrayTransformed.push(entry);
    }
    return officeByUserDataArrayTransformed;
  }

  transformUserByAwardData(data) {
    const userByAwardData = data;
    const userByAwardDataArray = Object.entries(userByAwardData).sort(Comparator);

    const userByAwardDataArrayTransformed = [];
    for (let i = 0; i < userByAwardDataArray.length; i += 1) {
      const userEmail = userByAwardDataArray[i][0];
      const awardCount = userByAwardDataArray[i][1];
      const entry = { user_email: userEmail, award_count: awardCount };
      userByAwardDataArrayTransformed.push(entry);
    }

    return userByAwardDataArrayTransformed;
  }

  // Render bar, chart, csv download for office by user count
  renderOfficeByUserCountQuerySection() {
    const officeByUserData = this.transformOfficeByUserData(this.props.queries.officeByUser);

    const renderChart = (
      <React.Fragment>
        <h4>Office By User Count</h4>
        <BarChart data={officeByUserData} width={960} height={300}>
          <Label value="User Count By Office" position="top" />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="office_name" />
          <XAxis dataKey="office_name" />
          <YAxis
            dataKey="user_count"
            allowDecimals={false}
            label={{ value: 'User Count', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="user_count" fill={blue[500]} name="User Count" />
        </BarChart>
      </React.Fragment>
    );

    const renderTable = (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Office Name</TableCell>
              <TableCell>User Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {officeByUserData.map(entry => {
              return (
                <TableRow key={entry.office_name}>
                  <TableCell>{entry.office_name}</TableCell>
                  <TableCell>{entry.user_count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );

    const csvDownload = (
      <React.Fragment>
        <CSVLink data={officeByUserData} filename="office_by_user_count.csv">
          <Button color="primary" variant="contained">
            Download CSV
          </Button>
        </CSVLink>
      </React.Fragment>
    );

    const querySection = (
      <React.Fragment>
        {renderChart}
        <br />
        {renderTable}
        <br />
        {csvDownload}
      </React.Fragment>
    );
    return querySection;
  }

  // Render bar, chart, csv download for user by award count
  renderUserByAwardCountSection() {
    const userByAwardData = this.transformUserByAwardData(this.props.queries.userByAward);

    const renderChart = (
      <React.Fragment>
        <h4>User By Award Count</h4>
        <BarChart data={userByAwardData} width={960} height={300}>
          <Label value="User Award Count" position="top" />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="user_email" />
          <XAxis dataKey="user_email" />
          <YAxis
            dataKey="award_count"
            allowDecimals={false}
            label={{ value: 'Award Count', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="award_count" fill={blue[500]} name="Award Count" />
        </BarChart>
      </React.Fragment>
    );

    const renderTable = (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Email</TableCell>
              <TableCell>Award Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userByAwardData.map(entry => {
              return (
                <TableRow key={entry.user_email}>
                  <TableCell>{entry.user_email}</TableCell>
                  <TableCell>{entry.award_count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );

    const csvDownload = (
      <React.Fragment>
        <CSVLink data={userByAwardData} filename="user_by_award_count.csv">
          <Button color="primary" variant="contained">
            Download CSV
          </Button>
        </CSVLink>
      </React.Fragment>
    );

    const querySection = (
      <React.Fragment>
        {renderChart}
        <br />
        {renderTable}
        <br />
        {csvDownload}
      </React.Fragment>
    );
    return querySection;
  }

  render() {
    const finishedLoadingData = !this.props.queries.loading;

    const title = <Typography variant="h5">Admin Portal: users</Typography>;

    const backButton = (
      <Button color="primary" variant="contained" href="/admin">
        Back to Admin Portal
      </Button>
    );

    return (
      <React.Fragment>
        {finishedLoadingData === false && <BaseLoadingBar />}
        {finishedLoadingData && (
          <Grid container direction="row" justify="center" alignItems="center">
            <div>
              <br />
              {title}
              <br />
              {backButton}
              <br />
              <br />
              {this.renderOfficeByUserCountQuerySection()}
              <br />
              <br />
              <Divider />
              <br />
              {this.renderUserByAwardCountSection()}
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
  queries: state.queries
});

export default connect(mapStateToProps)(QueryView);
