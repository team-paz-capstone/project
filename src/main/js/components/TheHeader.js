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
import { devLogIn, devLogOut, logOut } from '../actions';
import DeveloperControls from './DeveloperControls';
import AccountMenu from './AccountMenu';
import { NavLink } from 'react-router-dom';
import ThemeSwitchMenu from './ThemeSwitchMenu';
import { linkStyle } from '../ui/styles';

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
  handleChange = () => {
    if (this.props.auth) {
      console.debug('Logging out!');
      this.props.dispatch(devLogOut());
      return;
    }
    console.debug('Logging in!');
    this.props.dispatch(devLogIn('Test Token'));
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

    let loggedInUser = this.props.user;
    let name = loggedInUser
      ? loggedInUser.firstName + ' ' + loggedInUser.lastName
      : 'Invalid User Logged In';

    // Disable developer control since login is working now
    // let productionMode = process.env.NODE_ENV === 'production';
    let productionMode = true;

    return (
      <form className={classes.root}>
        {productionMode ? <div>{null}</div> : <DeveloperControls />}
        <AppBar position="static">
          <Toolbar>
            <div>
              <ThemeSwitchMenu />
            </div>
            <Typography variant="h6" className={classes.grow}>
              <NavLink to="/" style={linkStyle}>
                Employee Award Recognition
              </NavLink>
            </Typography>
            {auth && (
              <div>
                <AccountMenu handleOnClick={this.handleLogOut} />
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
