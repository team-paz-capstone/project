import ActionTypes from '../action-types/views';

export const setAdminViewUsers = () => ({
  type: ActionTypes.ADMIN_VIEW_USERS
});

export const setAdminViewOffices = () => ({
  type: ActionTypes.ADMIN_VIEW_OFFICES
});

export const setDarkTheme = () => ({
  type: ActionTypes.SET_THEME_DARK
});

export const setLightTheme = () => ({
  type: ActionTypes.SET_THEME_LIGHT
});
