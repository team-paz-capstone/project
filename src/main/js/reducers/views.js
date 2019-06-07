import { ADMIN_VIEW_OFFICES, ADMIN_VIEW_USERS } from '../action-types/views';

const initialState = {
  currentAdminView: 'users'
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
    default:
      return state;
  }
}
