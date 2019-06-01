/*
* AppBar created following documentation
* https://material-ui.com/demos/app-bar/
* */
import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {logIn, logOut} from "../actions"
import BaseSelect from "./BaseSelect";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TheAppBar extends React.Component {
  state = {
    anchorEl: null,
  };

  handleChange = () => {
    if (this.props.auth) {
      console.debug("Logging out!");
      this.props.dispatch(logOut());
      return
    }

    console.debug("Logging in!");
    this.props.dispatch(logIn("Test Token"));
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {classes, auth} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    let users = this.props.users.items.map(user => {
      user.display = user["firstName"] + " " + user["lastName"];
      return user;
    });

    return (
        <div className={classes.root}>
          <FormGroup>
            <FormControlLabel
                control={
                  <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch"/>
                }
                label={auth ? 'Logout' : 'Login'}
            />
            <BaseSelect
                name={"Logged In As"}
                items={users}
                nameKey={"display"}
                valueKey={"id"}/>
            <br/>
          </FormGroup>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon/>
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Employee Award Recognition
              </Typography>
              {auth && (
                  <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                    >
                      <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    </Menu>
                  </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

TheAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  token: state.authentication.token,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(withStyles(styles)(TheAppBar));