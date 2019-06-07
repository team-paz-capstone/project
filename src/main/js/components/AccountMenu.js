import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { linkStyle } from '../ui/styles';

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
        {props.isAdmin === false && (
          <MenuItem onClick={popupState.close}>
            <Link to="/home/profile" style={linkStyle}>
              Profile
            </Link>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            props.handleOnClick();
            popupState.close();
          }}
        >
          <Link to="/" style={linkStyle}>
            Log Out
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication,
  user: state.authentication.user,
  isAdmin: state.authentication.isAdmin,
  token: state.authentication.token,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(AccountMenu);
