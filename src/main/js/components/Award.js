import React from 'react';
import Button from '@material-ui/core/Button';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import { deleteAward, fetchAwards } from '../actions';

class Award extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteAward = this.handleDeleteAward.bind(this);
  }

  handleDeleteAward() {
    if (!confirm('Are you sure you want to delete this award?')) {
      return false;
    }
    // delete the award
    this.props.dispatch(deleteAward(this.props.award.id));
  }

  render() {
    const awardId = this.props.award.id;
    const awardType = this.props.award.awardType.name;
    const granterName = `${this.props.award.granter.firstName} ${
      this.props.award.granter.lastName
    }`;
    const recipientName = `${this.props.award.recipient.firstName} ${
      this.props.award.recipient.lastName
    }`;
    const date = new Date(this.props.award.timestamp).toDateString();

    const deleteButton = (
      <Button color="secondary" variant="outlined" id={awardId} onClick={this.handleDeleteAward}>
        Delete
      </Button>
    );

    return (
      <TableRow>
        <TableCell>{awardId}</TableCell>
        <TableCell>{awardType}</TableCell>
        <TableCell>{recipientName}</TableCell>
        <TableCell>{granterName}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{deleteButton} </TableCell>
      </TableRow>
    );
  }
}

export default connect()(Award);
