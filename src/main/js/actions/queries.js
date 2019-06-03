import { getOfficeByUserCount, getUserByAwardCount } from '../api/query';

import ActionTypes from '../action-types/queries';

export function fetchOfficeByUserCount() {
  return async dispatch => {
    dispatch(fetchOfficeByUserCountBegin());
    try {
      const response = await getOfficeByUserCount();
      const officeByUser = response.data;
      dispatch(fetchOfficeByUserCountSuccess(officeByUser));
    } catch (error) {
      dispatch(fetchOfficeByUserCountFailure(error.response.statusText));
    }
  };
}

export function fetchUserByAwardCount() {
  return async dispatch => {
    dispatch(fetchUserByAwardCountBegin());
    try {
      const response = await getUserByAwardCount();
      const userByAward = response.data;
      dispatch(fetchUserByAwardCountSuccess(userByAward));
    } catch (error) {
      dispatch(fetchUserByAwardCountFailure(error.response.statusText));
    }
  };
}

export const fetchOfficeByUserCountBegin = () => ({
  type: ActionTypes.FETCH_USER_COUNT_BY_OFFICE_BEGIN
});

export const fetchOfficeByUserCountSuccess = officeByUser => ({
  type: ActionTypes.FETCH_USER_COUNT_BY_OFFICE_SUCCESS,
  payload: { officeByUser }
});

export const fetchOfficeByUserCountFailure = error => ({
  type: ActionTypes.FETCH_USER_COUNT_BY_OFFICE_FAILURE,
  payload: { error }
});

export const fetchUserByAwardCountBegin = () => ({
  type: ActionTypes.FETCH_AWARD_COUNT_BY_USER_BEGIN
});

export const fetchUserByAwardCountSuccess = userByAward => ({
  type: ActionTypes.FETCH_AWARD_COUNT_BY_USER_SUCCESS,
  payload: { userByAward }
});

export const fetchUserByAwardCountFailure = error => ({
  type: ActionTypes.FETCH_AWARD_COUNT_BY_USER_FAILURE,
  payload: { error }
});
