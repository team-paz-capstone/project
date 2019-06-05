/*
 * AppBar created following documentation
 * https://material-ui.com/demos/app-bar/
 * */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { devLogIn, devLogOut, logOut } from '../actions';
import DeveloperControls from './DeveloperControls';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class TheHeader extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = () => {
    if (this.props.auth) {
      console.debug('Logging out!');
      this.props.dispatch(devLogOut());
      return;
    }

    console.debug('Logging in!');
    this.props.dispatch(devLogIn('Test Token'));
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    try {
      this.props.dispatch(logOut());
    } catch {
      console.log('Logout failed');
    }
  };

  render() {
    const { classes, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let loggedInUser = this.props.user;
    let name = loggedInUser
      ? loggedInUser.firstName + ' ' + loggedInUser.lastName
      : 'Invalid User Logged In';

    // Check for development vs. production environment
    let productionMode = process.env.NODE_ENV === 'production';

    return (
      <form className={classes.root}>
        {productionMode ? <div>{null}</div> : <DeveloperControls />}
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
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
                  <Typography variant="h6">{name}</Typography>

                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
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
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  user: state.authentication.user,
  token: state.authentication.token,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(withStyles(styles)(TheHeader));
