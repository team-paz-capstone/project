import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import BaseSelect from "./BaseSelect";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import {logIn, logOut} from "../actions"

const styles = theme =>({
  root: {
    padding: 20,
  },
  paper: {
    margin: 'auto',
    padding: 15,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});


class DeveloperControls extends Component {
  handleChange = () => {
    if (this.props.auth) {
      console.debug("Logging out!");
      this.props.dispatch(logOut());
      return
    }

    console.debug("Logging in!");
    this.props.dispatch(logIn("Test Token"));
  };

  render() {
    const {classes} = this.props;
    let users = this.props.users.items.map(user => {
      user.display = user["firstName"] + " " + user["lastName"];
      return user;
    });
    return (
        <Grid
            container
            className={classes.root}
            spacing={0}
            alignContent={"center"}
            alignItems="center"
            justify="center"
        >
          <Grid item xs={7}>
            <Paper className={classes.paper}>
              <h2>Developer Tools</h2>
              <FormGroup>
                <FormControlLabel
                    control={
                      <Switch checked={this.props.auth} onChange={this.handleChange} aria-label="LoginSwitch"/>
                    }
                    label={this.props.auth ? 'Logout' : 'Login'}
                    className={classes.formControl}
                />
                <BaseSelect
                    name={"Logged In As"}
                    items={users}
                    nameKey={"display"}
                    valueKey={"id"}/>
                <br/>
              </FormGroup>
            </Paper>
          </Grid>
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(withStyles(styles)(DeveloperControls));