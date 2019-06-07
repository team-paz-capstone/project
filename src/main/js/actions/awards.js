import Api from '../api/awards';
import ActionTypes from '../action-types/awards';

export function fetchAwards() {
  return async dispatch => {
    dispatch(fetchAwardsBegin());
    try {
      let response = await Api.getAllAwards();
      let awards = response.data;
      dispatch(fetchAwardsSuccess(awards));
    } catch (error) {
      dispatch(fetchAwardsFailure(error.response.statusText));
    }
  };
}

export function fetchAward(id) {
  return async dispatch => {
    dispatch(fetchAwardBegin());
    try {
      let response = await Api.getAward(id);
      let awards = response.data;
      dispatch(fetchAwardSuccess(awards));
    } catch (error) {
      dispatch(fetchAwardFailure(error.response.statusText));
    }
  };
}

export function fetchAwardByGranter(id) {
  return async dispatch => {
    dispatch(fetchAwardByGranterBegin());
    try {
      let response = await Api.getAwardByGranter(id);
      let awards = response.data;
      dispatch(fetchAwardByGranterSuccess(awards));
    } catch (error) {
      dispatch(fetchAwardByGranterFailure(error.response.statusText));
    }
  };
}

export function fetchAwardByRecipient(id) {
  return async dispatch => {
    dispatch(fetchAwardByRecipientBegin());
    try {
      let response = await Api.getAwardByRecipient(id);
      let awards = response.data;
      dispatch(fetchAwardByRecipientSuccess(awards));
    } catch (error) {
      dispatch(fetchAwardByRecipientFailure(error.response.statusText));
    }
  };
}

export function createAward(data) {
  return async dispatch => {
    dispatch(createAwardBegin());
    try {
      let response = await Api.createAward(data);
      dispatch(createAwardSuccess(response));
    } catch (error) {
      dispatch(createAwardFailure(error.response.statusText));
    }
  };
}

export function deleteAward(id) {
  return async dispatch => {
    dispatch(deleteAwardBegin());
    try {
      let response = await Api.deleteAward(id);
      dispatch(deleteAwardSuccess(id));
    } catch (error) {
      dispatch(deleteAwardFailure(error.response.statusText));
    }
  };
}

/*
 * Fetch Awards
 * */
export const fetchAwardsBegin = () => ({
  type: ActionTypes.FETCH_AWARDS_BEGIN
});

export const fetchAwardsSuccess = awards => ({
  type: ActionTypes.FETCH_AWARDS_SUCCESS,
  payload: { awards }
});

export const fetchAwardsFailure = error => ({
  type: ActionTypes.FETCH_AWARDS_FAILURE,
  payload: { error }
});

/*
 * Fetch Award
 * */
export const fetchAwardBegin = () => ({
  type: ActionTypes.FETCH_AWARD_BEGIN
});

export const fetchAwardSuccess = award => ({
  type: ActionTypes.FETCH_AWARD_SUCCESS,
  payload: { award }
});

export const fetchAwardFailure = error => ({
  type: ActionTypes.FETCH_AWARD_FAILURE,
  payload: { error }
});

export const fetchAwardByGranterBegin = () => ({
  type: ActionTypes.FETCH_AWARD_BY_GRANTER_BEGIN
});

export const fetchAwardByGranterSuccess = award => ({
  type: ActionTypes.FETCH_AWARD_BY_GRANTER_SUCCESS,
  payload: { award }
});

export const fetchAwardByGranterFailure = error => ({
  type: ActionTypes.FETCH_AWARD_BY_GRANTER_FAILURE,
  payload: { error }
});

export const fetchAwardByRecipientBegin = () => ({
  type: ActionTypes.FETCH_AWARD_BY_RECIPIENT_BEGIN
});

export const fetchAwardByRecipientSuccess = award => ({
  type: ActionTypes.FETCH_AWARD_BY_RECIPIENT_SUCCESS,
  payload: { award }
});

export const fetchAwardByRecipientFailure = error => ({
  type: ActionTypes.FETCH_AWARD_BY_RECIPIENT_FAILURE,
  payload: { error }
});

/*
 * Create Award
 * */
export const createAwardBegin = () => ({
  type: ActionTypes.CREATE_AWARD_BEGIN
});

export const createAwardSuccess = award => ({
  type: ActionTypes.CREATE_AWARD_SUCCESS,
  payload: { award }
});

export const createAwardFailure = error => ({
  type: ActionTypes.CREATE_AWARD_FAILURE,
  payload: { error }
});

/*
 * Delete Award
 * */
export const deleteAwardBegin = () => ({
  type: ActionTypes.DELETE_AWARD_BEGIN
});

export const deleteAwardSuccess = id => ({
  type: ActionTypes.DELETE_AWARD_SUCCESS,
  payload: { id }
});

export const deleteAwardFailure = error => ({
  type: ActionTypes.DELETE_AWARD_FAILURE,
  payload: { error }
});
