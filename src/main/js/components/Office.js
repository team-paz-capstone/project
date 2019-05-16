import React from 'react';
import Button from '@material-ui/core/Button';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Office extends React.Component {
  handleClick(e) {
    if (!confirm('Are you sure you want to delete this user?')) return false;
  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.props.office.id}</TableCell>
        <TableCell>{this.props.office.name}</TableCell>
        <TableCell>{this.props.office.location}</TableCell>

        <TableCell>
          <Button
            color="primary"
            variant="outlined"
            href={`/offices/updateForm?officeId=${this.props.office.id}`}
          >
            Update
          </Button>
        </TableCell>

        <TableCell>
          <Button
            color="secondary"
            variant="outlined"
            href={`/offices/delete?officeId=${this.props.office.id}`}
            onClick={this.handleClick}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default Office;
