import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import BaseSelect from './BaseSelect';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import BaseError from './BaseError';
import { createAward, fetchAwards } from '../actions';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 1
  },
  formControl: {
    margin: 1,
    minWidth: 120
  },
  grow: {
    flexGrow: 1
  },
  paper: {
    padding: 50,
    textAlign: 'center'
  }
});

class CreateAwardForm extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '', created: false };
  }

  createAward = () => {
    console.debug('Create Award Clicked...');
    let selectedGranter = this.props.user;
    let selectedRecipient = this.props.select.items['Recipient'];
    let selectedAwardType = this.props.select.items['Award Type'];

    if (!selectedGranter) {
      console.warn('No selectedGranter');
      this.setState({ error: 'Login is invalid: Please log out and log back in!' });
    } else if (!selectedRecipient) {
      console.warn('No selectedRecipient');
      this.setState({ error: 'Please Select a Recipient!' });
    } else if (!selectedAwardType) {
      console.warn('No selectedAwardType');
      this.setState({ error: 'Please Select an Award Type!' });
    } else {
      this.setState({ error: '', created: 'Created Award!' });
      console.debug('Creating award!');

      let granterID = selectedGranter.id;
      let recipientID = selectedRecipient.id;
      let awardTypeID = selectedAwardType.id;

      this.props.dispatch(
        createAward({
          granterID: granterID,
          recipientID: recipientID,
          awardTypeID: awardTypeID
        })
      );
    }
  };

  createAnother = () => {
    this.setState({ error: '', created: '' });
  };

  render() {
    const { classes } = this.props;
    let selectedOffice = this.props.select.items['Office Filter'];
    let users = this.props.users.items
      .filter(user => {
        if (selectedOffice === undefined || selectedOffice === '') {
          return true;
        }
        return user['office'] !== null && user['office']['id'] === selectedOffice['id'];
      })
      .map(user => {
        user.display = user['firstName'] + ' ' + user['lastName'];
        return user;
      });

    let error = this.props.awards.error ? this.props.awards.error : this.state.error;
    let created = !this.props.awards.error && this.state.created ? this.state.created : null;

    return (
      <Paper className={classes.paper}>
        {created ? (
          <div>
            <h3>{created}</h3>
            <Button variant="contained" color="primary" onClick={this.createAnother}>
              Create Another Award
            </Button>
          </div>
        ) : (
          <FormGroup className={classes.root}>
            <h2>Recognize Hard Work!</h2>
            <h3>{created}</h3>
            <BaseError error={error} />
            <BaseSelect name={'Recipient'} items={users} nameKey={'display'} valueKey={'id'} />
            <br />
            <BaseSelect
              name={'Office Filter'}
              items={this.props.offices.items}
              nameKey={'name'}
              valueKey={'id'}
            />
            <br />
            <BaseSelect
              name={'Award Type'}
              items={this.props.awardTypes.items}
              nameKey={'name'}
              valueKey={'id'}
            />
            <br />
            <Button variant="contained" color="primary" onClick={this.createAward}>
              Send Award
            </Button>
          </FormGroup>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authentication.user,
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(withStyles(styles)(CreateAwardForm));
