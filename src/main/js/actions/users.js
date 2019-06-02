import Api from "../api/user"

import ActionTypes from "../action-types/users"

export function fetchUsers() {
  return async dispatch => {
    dispatch(fetchUsersBegin());
    try {
      let response = await Api.getAllUsers();
      let users = response.data;
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.response.statusText));
    }
  };
}

export function fetchUser(id) {
  return async dispatch => {
    dispatch(fetchUserBegin());
    try {
      let response = await Api.getUser(id);
      let users = response.data;
      dispatch(fetchUserSuccess(users));
    } catch (error) {
      dispatch(fetchUserFailure(error.response.statusText));
    }
  };
}

export function createUser(data) {
  return async dispatch => {
    dispatch(createUserBegin());
    try {
      let response = await Api.createUser(data);
      let user = response.data;
      dispatch(createUserSuccess(user));
    } catch (error) {
      dispatch(createUserFailure(error.response.statusText));
    }
  };
}

export function updateUser(data) {
  return async dispatch => {
    dispatch(updateUserBegin());
    try {
      let response = await Api.updateUser(data);
      let user = response.data;
      dispatch(updateUserSuccess(user));
    } catch (error) {
      dispatch(updateUserFailure(error.response.statusText));
    }
  };
}

export function deleteUser(data) {
  return async dispatch => {
    dispatch(deleteUserBegin());
    try {
      let response = await Api.deleteUser(data);
      let user = response.data;
      dispatch(deleteUserSuccess(user));
    } catch (error) {
      dispatch(deleteUserFailure(error.response.statusText));
    }
  };
}

/* TODO: Update User Password*/
// export function updatePassword(data) {
//   return async dispatch => {
//     dispatch(updateUserPasswordBegin());
//     try {
//       let response = await Api.(data);
//       let user = response.data;
//       dispatch(deleteUserSuccess(user));
//     } catch (error) {
//       dispatch(deleteUserFailure(error));
//     }
//   };
// }

/* TODO: Request Password Update/
// export function updatePassword(data) {
//   return async dispatch => {
//     dispatch(updateUserPasswordBegin());
//     try {
//       let response = await Api.(data);
//       let user = response.data;
//       dispatch(deleteUserSuccess(user));
//     } catch (error) {
//       dispatch(deleteUserFailure(error));
//     }
//   };
// }


 */
/*
* Fetch Users
* */
export const fetchUsersBegin = () => ({
  type: ActionTypes.FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload: {users}
});

export const fetchUsersFailure = error => ({
  type: ActionTypes.FETCH_USERS_FAILURE,
  payload: {error}
});

/*
* Fetch User
* */
export const fetchUserBegin = () => ({
  type: ActionTypes.FETCH_USER_BEGIN
});

export const fetchUserSuccess = user => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  payload: {user}
});

export const fetchUserFailure = error => ({
  type: ActionTypes.FETCH_USER_FAILURE,
  payload: {error}
});

/*
* Create User
* */
export const createUserBegin = () => ({
  type: ActionTypes.CREATE_USER_BEGIN
});

export const createUserSuccess = user => ({
  type: ActionTypes.CREATE_USER_SUCCESS,
  payload: {user}
});

export const createUserFailure = error => ({
  type: ActionTypes.CREATE_USER_FAILURE,
  payload: {error}
});

/*
* Update User
* */
export const updateUserBegin = () => ({
  type: ActionTypes.UPDATE_USER_BEGIN
});

export const updateUserSuccess = user => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload: {user}
});

export const updateUserFailure = error => ({
  type: ActionTypes.UPDATE_USER_FAILURE,
  payload: {error}
});


/*
* Delete User
* */
export const deleteUserBegin = () => ({
  type: ActionTypes.UPDATE_USER_BEGIN
});

export const deleteUserSuccess = user => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  payload: {user}
});

export const deleteUserFailure = error => ({
  type: ActionTypes.UPDATE_USER_FAILURE,
  payload: {error}
});

/*
* Delete User
* */
export const updateUserPasswordBegin = () => ({
  type: ActionTypes.UPDATE_USER_PASSWORD_BEGIN
});

export const updateUserPasswordSuccess = user => ({
  type: ActionTypes.UPDATE_USER_PASSWORD_SUCCESS,
  payload: {user}
});

export const updateUserPasswordFailure = error => ({
  type: ActionTypes.UPDATE_USER_PASSWORD_FAILURE,
  payload: {error}
});