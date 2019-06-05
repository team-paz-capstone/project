import React from 'react';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import BaseSelect from './BaseSelect';
import { withStyles } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { devLogIn, devLogOut } from '../actions';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  root: {
    padding: 20
  },
  paper: {
    ...theme.paper,
    color: theme.palette.text.secondary
  }
});

function DeveloperControls(props) {
  const { classes } = props;
  let users;
  const handleChange = () => {
    if (props.auth) {
      props.dispatch(devLogOut());
      return;
    }
    props.dispatch(devLogIn('Test Token'));
  };

  users = props.users.items.map(user => {
    user.display = user['firstName'] + ' ' + user['lastName'];
    return user;
  });

  return (
    <Grid
      container
      className={classes.root}
      spacing={0}
      alignContent={'center'}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={7}>
        <Card className={classes.paper}>
          <h2>Developer Tools</h2>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={props.auth} onChange={handleChange} aria-label="LoginSwitch" />
              }
              label={props.auth ? 'Logout' : 'Login'}
              className={classes.formControl}
            />
            <BaseSelect name={'Logged In As'} items={users} nameKey={'display'} valueKey={'id'} />
            <br />
          </FormGroup>
          <CardActions>
            <Button size="small">
              <Link to="/admin">Admin Console</Link>
            </Button>
          </CardActions>
          <CardActions>
            <Button size="small">
              <Link to="/query">Query Console</Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(withStyles(styles)(DeveloperControls));
