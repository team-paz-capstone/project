import React, {Component} from 'react';
import User from './User';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UserList extends Component {
  render() {
    console.debug(this.props);
    const users = this.props.users.map((user) => (
      <User key={user.email} user={user} />
    ));
    return (
      <Paper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Signature</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>{users}</TableBody>

        </Table>

      </Paper>
    );
  }
}

export default UserList;
