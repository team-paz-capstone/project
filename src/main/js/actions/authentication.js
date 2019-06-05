import {
  DEV_LOG_IN,
  DEV_LOG_OUT,
  LOG_IN_BEGIN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT
} from '../action-types';
import Api from '../api/user';

export function devLogIn(token) {
  return {
    type: DEV_LOG_IN,
    token
  };
}

export function devLogOut() {
  return {
    type: DEV_LOG_OUT,
    token: ''
  };
}

export function logIn(data) {
  return async dispatch => {
    dispatch(loginBegin());
    try {
      let response = await Api.logInUser(data);
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
}

export function logOut() {
  return { type: LOG_OUT };
}

export const loginBegin = () => ({
  type: LOG_IN_BEGIN
});

export const loginSuccess = users => ({
  type: LOG_IN_SUCCESS,
  payload: { users }
});

export const loginFailure = error => ({
  type: LOG_IN_FAILURE,
  payload: { error }
});
