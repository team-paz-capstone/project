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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {logIn, logOut} from "../actions"
import DeveloperControls from "./DeveloperControls";

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

class TheHeader extends React.Component {
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

    let loggedInUser = this.props.select.items["Logged In As"];
    let name = loggedInUser ? loggedInUser["display"] : "Invalid User Logged In";

    // TODO: Once the login page is working, uncomment
    //  let productionMode = process.env.NODE_ENV === 'development';
    let productionMode = false;

    return (
        <form className={classes.root}>
          {productionMode ? (
              <div>{null}</div>
          ) : (
              <DeveloperControls/>
          )}
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
                    {name}
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
        </form>
    );
  }
}

TheHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  auth: state.authentication.auth,
  token: state.authentication.token,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(withStyles(styles)(TheHeader));