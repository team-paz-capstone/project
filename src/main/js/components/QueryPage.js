import React, { Component } from 'react';
import { BarChart, Line, XAxis, YAxis, Tooltip, Bar, Label } from 'recharts';
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
import { CSVLink, CSVDownload } from 'react-csv';
import { getOfficeByUserCount } from '../api/query';
import LoadingBar from './LoadingBar';

// sort by count from largest to smallest
function Comparator(a, b) {
  if (a[1] < b[1]) return 1;
  if (a[1] > b[1]) return -1;
  return 0;
}

class QueryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      finishedLoadingData: false
    };
  }

  // noinspection JSCheckFunctionSignatures
  async componentDidMount() {
    try {
      const data = await getOfficeByUserCount();
      const dataArray = Object.entries(data).sort(Comparator);

      const dataArrayTransformed = [];
      for (let i = 0; i < dataArray.length; i++) {
        const officeName = dataArray[i][0];
        const userCount = dataArray[i][1];
        const entry = { name: officeName, count: userCount };
        dataArrayTransformed.push(entry);
      }

      this.setState({ data: dataArrayTransformed });
      console.log(dataArrayTransformed);

      // data loading is finished
      this.setState({ finishedLoadingData: true });
    } catch (error) {
      console.warn('Failed to load users/offices!');
    }
  }

  render() {
    const { data, finishedLoadingData } = this.state;

    const title = <Typography variant="h5">Admin Portal: users</Typography>;

    const backButton = (
      <Button color="primary" variant="contained" href="/admin">
        Back to Admin Portal
      </Button>
    );

    const renderChart = (
      <div>
        <h4>User Count By Office</h4>
        <BarChart data={data} width={960} height={300}>
          <Label value="User Count By Office" position="top" />
          <Line type="monotone" dataKey="name" />
          <XAxis dataKey="name" />
          <YAxis
            allowDecimals={false}
            label={{ value: 'User Count', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="count" fill={blue[500]} />
        </BarChart>
      </div>
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
            {data.map(entry => {
              return (
                <TableRow>
                  <TableCell>{entry.name}</TableCell>
                  <TableCell>{entry.count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );

    const csvDownload = (
      <div>
        <CSVLink data={data}>
          <Button color="primary" variant="contained">
            Download CSV
          </Button>
        </CSVLink>
      </div>
    );

    return (
      <React.Fragment>
        <Grid container direction="row" justify="center" alignItems="center">
          {finishedLoadingData === false && <LoadingBar />}
          {finishedLoadingData && (
            <div>
              <br />
              {title}

              <br />
              {backButton}
              <br />

              <br />
              {renderChart}
              <br />

              <br />
              {renderTable}
              <br />

              {csvDownload}

              <br />
              <br />
              <br />
            </div>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default QueryPage;