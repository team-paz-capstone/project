import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function AccountMenu(props) {
  const popupState = usePopupState({ variant: 'popover', popupId: 'menu-appbar' });
  let loggedInUser = props.user || props.select.items['Logged In As'];
  let name = loggedInUser
    ? loggedInUser.firstName + ' ' + loggedInUser.lastName
    : 'Invalid User Logged In';

  return (
    <div>
      {name}
      <IconButton {...bindTrigger(popupState)} color="inherit">
        <SvgIcon>
          <AccountCircle />
        </SvgIcon>
      </IconButton>
      <Menu {...bindMenu(popupState)} id="menu-appbar" color="inherit">
        <MenuItem>
          <Link to="/home/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={props.handleOnClick}>Log Out</MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication,
  user: state.authentication.user,
  token: state.authentication.token,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(AccountMenu);
