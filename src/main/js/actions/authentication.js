import { LOG_IN, LOG_OUT } from '../action-types';

export function logIn(token) {
  return {
    type: LOG_IN,
    token
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
    token: ''
  };
}
