import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class User extends Component {
  handleClick(e) {
    if (!confirm('Are you sure you want to delete this user?')) return false;
  }

  render() {
    // check if the user has a signature stored
    const hasSignature = this.props.user.encodedSignature !== '';

    let viewSignatureButton;

    if (hasSignature) {
      viewSignatureButton = (
        <Button
          color="primary"
          variant="outlined"
          href={`/users/viewSignature?userId=${this.props.user.id}`}
        >
          {' '}
          View
{' '}
        </Button>
      );
    }

    return (
      <TableRow>
        <TableCell>{this.props.user.id}</TableCell>
        <TableCell>{this.props.user.firstName}</TableCell>
        <TableCell>{this.props.user.lastName}</TableCell>
        <TableCell>{this.props.user.email}</TableCell>
        <TableCell>{this.props.user.admin.toString()}</TableCell>
        <TableCell>
          {' '}
          {this.props.user.office === null ? '' : this.props.user.office.name}
{' '}
        </TableCell>

        <TableCell>{viewSignatureButton}</TableCell>

        <TableCell>
          <Button
            color="primary"
            variant="outlined"
            href={`/users/updateForm?userId=${this.props.user.id}`}
          >
            Update
          </Button>
        </TableCell>

        <TableCell>
          <Button
            color="secondary"
            variant="outlined"
            href={`/users/delete?userId=${this.props.user.id}`}
            onClick={this.handleClick}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default User;
