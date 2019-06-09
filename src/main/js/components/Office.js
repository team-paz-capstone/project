import React from 'react';
import Button from '@material-ui/core/Button';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { linkStyle } from '../ui/styles';
import Confirmation from './Confirmation';

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
          <Link href={`/offices/updateForm?officeId=${this.props.office.id}`} style={linkStyle}>
            <Button color="primary" variant="outlined">
              Update
            </Button>
          </Link>
        </TableCell>

        <TableCell>
          <Confirmation
            color="secondary"
            variant="outlined"
            id={this.props.office.id}
            buttonText="Delete"
            confirmationText="Are you sure you want to delete this office?"
            confirmationTitle="Office Deletion Confirmation"
            confirmationURL={`/offices/delete?officeId=${this.props.office.id}`}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default Office;
