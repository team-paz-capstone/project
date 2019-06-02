import Api from "../api/award-types"
import ActionTypes from "../action-types/award-types"

export function fetchAwardTypes() {
  return async dispatch => {
    dispatch(fetchAwardTypesBegin());
    try {
      let response = await Api.getAllAwardTypes();
      let awardTypes = response.data;
      dispatch(fetchAwardTypesSuccess(awardTypes));
    } catch (error) {
      dispatch(fetchAwardTypesFailure(error.response.statusText));
    }
  };
}

export function fetchAwardType(id) {
  return async dispatch => {
    dispatch(fetchAwardTypeBegin());
    try {
      let response = await Api.getAwardType(id);
      let awardType = response.data;
      dispatch(fetchAwardTypeSuccess(awardType));
    } catch (error) {
      dispatch(fetchAwardTypeFailure(error.response.statusText));
    }
  };
}

export function createAwardType(data) {
  return async dispatch => {
    dispatch(createAwardTypeBegin());
    try {
      let response = await Api.createAwardType(data);
      let awardType = response.data;
      dispatch(createAwardTypeSuccess(awardType));
    } catch (error) {
      dispatch(createAwardTypeFailure(error.response.statusText));
    }
  };
}

export function deleteAwardType(data) {
  return async dispatch => {
    dispatch(deleteAwardTypeBegin());
    try {
      let response = await Api.deleteAwardType(data);
      dispatch(deleteAwardTypeSuccess(response.data));
    } catch (error) {
      dispatch(deleteAwardTypeFailure(error.response.statusText));
    }
  };
}

/*
* Fetch AwardTypes
* */
export const fetchAwardTypesBegin = () => ({
  type: ActionTypes.FETCH_AWARD_TYPES_BEGIN
});

export const fetchAwardTypesSuccess = awardTypes => ({
  type: ActionTypes.FETCH_AWARD_TYPES_SUCCESS,
  payload: {awardTypes}
});

export const fetchAwardTypesFailure = error => ({
  type: ActionTypes.FETCH_AWARD_TYPES_FAILURE,
  payload: {error}
});

/*
* Fetch AwardType
* */
export const fetchAwardTypeBegin = () => ({
  type: ActionTypes.FETCH_AWARD_TYPE_BEGIN
});

export const fetchAwardTypeSuccess = awardType => ({
  type: ActionTypes.FETCH_AWARD_TYPE_SUCCESS,
  payload: {awardType}
});

export const fetchAwardTypeFailure = error => ({
  type: ActionTypes.FETCH_AWARD_TYPE_FAILURE,
  payload: {error}
});

/*
* Create AwardType
* */
export const createAwardTypeBegin = () => ({
  type: ActionTypes.CREATE_AWARD_TYPE_BEGIN
});

export const createAwardTypeSuccess = awardType => ({
  type: ActionTypes.CREATE_AWARD_TYPE_SUCCESS,
  payload: {awardType}
});

export const createAwardTypeFailure = error => ({
  type: ActionTypes.CREATE_AWARD_TYPE_FAILURE,
  payload: {error}
});

/*
* Delete AwardType
* */
export const deleteAwardTypeBegin = () => ({
  type: ActionTypes.DELETE_AWARD_TYPE_BEGIN
});

export const deleteAwardTypeSuccess = awardType => ({
  type: ActionTypes.DELETE_AWARD_TYPE_SUCCESS,
  payload: {awardType}
});

export const deleteAwardTypeFailure = error => ({
  type: ActionTypes.DELETE_AWARD_TYPE_FAILURE,
  payload: {error}
});
