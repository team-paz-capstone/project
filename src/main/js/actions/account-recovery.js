import ActionTypes from '../action-types/account-recovery';
import Api from '../api/account-recovery';

export function updatePassword(data) {
  return async dispatch => {
    dispatch(updatePasswordBegin());
    try {
      let response = await Api.changePassword(data);
      dispatch(updatePasswordSuccess(response.data));
    } catch (error) {
      dispatch(updatePasswordFailure(error));
    }
  };
}

export function accountRecovery(data) {
  return async dispatch => {
    dispatch(accountRecoveryBegin());
    try {
      let response = await Api.requestAccountRecovery(data);
      dispatch(accountRecoverySuccess(response.data));
    } catch (error) {
      dispatch(accountRecoveryFailure(error));
    }
  };
}

export const updatePasswordBegin = () => ({
  type: ActionTypes.UPDATE_PASSWORD_BEGIN
});

export const updatePasswordSuccess = users => ({
  type: ActionTypes.UPDATE_PASSWORD_SUCCESS,
  payload: { users }
});

export const updatePasswordFailure = error => ({
  type: ActionTypes.UPDATE_PASSWORD_FAILURE,
  payload: { error }
});

export const accountRecoveryBegin = () => ({
  type: ActionTypes.ACCOUNT_RECOVERY_BEGIN
});

export const accountRecoverySuccess = users => ({
  type: ActionTypes.ACCOUNT_RECOVERY_SUCCESS,
  payload: { users }
});

export const accountRecoveryFailure = error => ({
  type: ActionTypes.ACCOUNT_RECOVERY_FAILURE,
  payload: { error }
});
