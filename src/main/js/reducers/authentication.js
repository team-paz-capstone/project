import {
  DEV_LOG_IN,
  DEV_LOG_OUT,
  LOG_IN_BEGIN,
  LOG_IN_FAILURE,
  LOG_IN_SUCCESS,
  LOG_OUT,
  UPDATE_USER_BEGIN,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS
} from '../action-types';

const initialState = {
  auth: false,
  token: '',
  user: null,
  loading: false,
  error: null,
  isAdmin: false,
  updateLoading: false,
  updateError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DEV_LOG_IN:
      return {
        ...state,
        auth: true,
        token: action.token
      };
    case DEV_LOG_OUT:
      return {
        ...state,
        auth: false,
        token: undefined
      };

    case LOG_IN_BEGIN:
      return {
        ...state,
        auth: false,
        loading: true,
        error: null
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        auth: true,
        loading: false,
        user: action.payload.users,
        isAdmin: action.payload.users.admin
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        auth: false,
        loading: false,
        error: action.payload.error.request.statusText
      };
    case LOG_OUT:
      return {
        ...state,
        auth: false,
        isAdmin: false,
        token: undefined
      };

    case UPDATE_USER_BEGIN:
      return {
        ...state,
        updateLoading: false,
        updateError: null
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateError: null,
        user: action.payload.user
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload.error
      };

    default:
      return state;
  }
}
