/*
 * SOURCE: https://daveceddia.com/where-fetch-data-redux/
 * */
import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CREATE_USER_BEGIN,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} from '../action-types/users';

const initialState = {
  items: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.users
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    case CREATE_USER_BEGIN:
      return {
        ...state,
        createLoading: true,
        createError: null
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createError: null,
        items: [...state.items, action.payload.user]
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        createLoading: false,
        createError: action.payload.error
      };

    default:
      return state;
  }
}
