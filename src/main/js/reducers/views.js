import {
  ADMIN_VIEW_OFFICES,
  ADMIN_VIEW_USERS,
  SET_THEME_DARK,
  SET_THEME_LIGHT
} from '../action-types/views';

const initialState = {
  currentAdminView: 'users',
  currentTheme: 'light'
};

export default function viewsReducer(state = initialState, action) {
  switch (action.type) {
    case ADMIN_VIEW_USERS:
      return {
        ...state,
        currentAdminView: 'users'
      };
    case ADMIN_VIEW_OFFICES:
      return {
        ...state,
        currentAdminView: 'offices'
      };
    case SET_THEME_DARK:
      return {
        ...state,
        currentTheme: 'dark'
      };
    case SET_THEME_LIGHT:
      return {
        ...state,
        currentTheme: 'light'
      };
    default:
      return state;
  }
}
