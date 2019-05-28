import Api, {getAllOffices} from "../api/office"

import ActionTypes from "../action-types/offices"

export function fetchOffices() {
  return async dispatch => {
    dispatch(fetchOfficesBegin());
    try {
      let response = await Api.getAllOffices();
      let offices = response.data;
      dispatch(fetchOfficesSuccess(offices));
    } catch (error) {
      dispatch(fetchOfficesFailure(error));
    }
  };
}

export function fetchOffice(id) {
  return async dispatch => {
    dispatch(fetchOfficeBegin());
    try {
      let response = await Api.getOffice(id);
      let offices = response.data;
      dispatch(fetchOfficeSuccess(offices));
    } catch (error) {
      dispatch(fetchOfficeFailure(error));
    }
  };
}

export function createOffice(data) {
  return async dispatch => {
    dispatch(createOfficeBegin());
    try {
      let response = await Api.createOffice(data);
      let office = response.data;
      dispatch(createOfficeSuccess(office));
    } catch (error) {
      dispatch(createOfficeFailure(error));
    }
  };
}

export function updateOffice(data) {
  return async dispatch => {
    dispatch(updateOfficeBegin());
    try {
      let response = await Api.updateOffice(data);
      let office = response.data;
      dispatch(updateOfficeSuccess(office));
    } catch (error) {
      dispatch(updateOfficeFailure(error));
    }
  };
}

export function deleteOffice(data) {
  return async dispatch => {
    dispatch(deleteOfficeBegin());
    try {
      let response = await Api.deleteOffice(data);
      let office = response.data;
      dispatch(deleteOfficeSuccess(office));
    } catch (error) {
      dispatch(deleteOfficeFailure(error));
    }
  };
}

/*
* Fetch Offices
* */
export const fetchOfficesBegin = () => ({
  type: ActionTypes.FETCH_OFFICES_BEGIN
});

export const fetchOfficesSuccess = offices => ({
  type: ActionTypes.FETCH_OFFICES_SUCCESS,
  payload: {offices}
});

export const fetchOfficesFailure = error => ({
  type: ActionTypes.FETCH_OFFICES_FAILURE,
  payload: {error}
});

/*
* Fetch Office
* */
export const fetchOfficeBegin = () => ({
  type: ActionTypes.FETCH_OFFICE_BEGIN
});

export const fetchOfficeSuccess = office => ({
  type: ActionTypes.FETCH_OFFICE_SUCCESS,
  payload: {office}
});

export const fetchOfficeFailure = error => ({
  type: ActionTypes.FETCH_OFFICE_FAILURE,
  payload: {error}
});

/*
* Create Office
* */
export const createOfficeBegin = () => ({
  type: ActionTypes.CREATE_OFFICE_BEGIN
});

export const createOfficeSuccess = office => ({
  type: ActionTypes.CREATE_OFFICE_SUCCESS,
  payload: {office}
});

export const createOfficeFailure = error => ({
  type: ActionTypes.CREATE_OFFICE_FAILURE,
  payload: {error}
});

/*
* Update Office
* */
export const updateOfficeBegin = () => ({
  type: ActionTypes.UPDATE_OFFICE_BEGIN
});

export const updateOfficeSuccess = office => ({
  type: ActionTypes.UPDATE_OFFICE_SUCCESS,
  payload: {office}
});

export const updateOfficeFailure = error => ({
  type: ActionTypes.UPDATE_OFFICE_FAILURE,
  payload: {error}
});

/*
* Delete Office
* */
export const deleteOfficeBegin = () => ({
  type: ActionTypes.UPDATE_OFFICE_BEGIN
});

export const deleteOfficeSuccess = office => ({
  type: ActionTypes.UPDATE_OFFICE_SUCCESS,
  payload: {office}
});

export const deleteOfficeFailure = error => ({
  type: ActionTypes.UPDATE_OFFICE_FAILURE,
  payload: {error}
});
