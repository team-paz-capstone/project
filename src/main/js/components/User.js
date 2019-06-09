import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Confirmation from './Confirmation';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { linkStyle } from '../ui/styles';

class User extends Component {
  render() {
    // check if the user has a signature stored
    const hasSignature = this.props.user.encodedSignature !== '';

    let viewSignatureButton;

    if (hasSignature) {
      viewSignatureButton = (
        <Link href={`/users/viewSignature?userId=${this.props.user.id}`} style={linkStyle}>
          <Button color="primary" variant="outlined">
            View
          </Button>
        </Link>
      );
    }

    // get the date of account creation
    const date = new Date(this.props.user.timestamp).toDateString();

    return (
      <TableRow>
        <TableCell>{this.props.user.id}</TableCell>
        <TableCell>{this.props.user.firstName}</TableCell>
        <TableCell>{this.props.user.lastName}</TableCell>
        <TableCell>{this.props.user.email}</TableCell>
        <TableCell>{this.props.user.admin.toString() === 'true' ? 'Yes' : 'No'}</TableCell>
        <TableCell>{this.props.user.office === null ? '' : this.props.user.office.name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{viewSignatureButton}</TableCell>

        <TableCell>
          <Link href={`/users/updateForm?userId=${this.props.user.id}`} style={linkStyle}>
            <Button color="primary" variant="outlined">
              Update
            </Button>
          </Link>
        </TableCell>

        <TableCell>
          <Confirmation
            color="secondary"
            variant="outlined"
            id={this.props.user.id}
            buttonText="Delete"
            confirmationText="Are you sure you want to delete this user?"
            confirmationTitle="User Deletion Confirmation"
            confirmationURL={`/users/delete?userId=${this.props.user.id}`}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default connect()(User);
