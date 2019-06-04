import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Award from './Award';

class AwardList extends Component {
  render() {
    const awards = this.props.awards.map(award => <Award key={award.id} award={award} />);
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Award Type</TableCell>
              <TableCell>Recipient Name</TableCell>
              <TableCell>Granter Name</TableCell>
              <TableCell>Date granted</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{awards}</TableBody>
        </Table>
      </Paper>
    );
  }
}

export default AwardList;
