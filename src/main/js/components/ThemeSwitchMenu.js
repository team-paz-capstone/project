import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { setDarkTheme, setLightTheme } from '../actions';

function ThemeSwitchMenu(props) {
  const handleSwitchTheme = () => {
    console.log(props.currentTheme);
    if (props.currentTheme === 'light') {
      console.log('Switching to light');
      props.dispatch(setDarkTheme());
    }
    if (props.currentTheme === 'dark') {
      console.log('Switching to dark');
      props.dispatch(setLightTheme());
    }
  };

  const popupState = usePopupState({ variant: 'popover', popupId: 'menu-appbar' });
  return (
    <div>
      <IconButton {...bindTrigger(popupState)} color="inherit">
        <SvgIcon>
          <MenuIcon />
        </SvgIcon>
      </IconButton>
      <Menu {...bindMenu(popupState)} id="menu-appbar" color="inherit">
        <MenuItem
          onClick={() => {
            handleSwitchTheme();
            popupState.close();
          }}
        >
          Switch Theme
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = state => ({
  currentTheme: state.views.currentTheme
});

export default connect(mapStateToProps)(ThemeSwitchMenu);
