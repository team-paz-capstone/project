import {
  ACCOUNT_RECOVERY_BEGIN,
  ACCOUNT_RECOVERY_SUCCESS,
  ACCOUNT_RECOVERY_FAILURE,
  UPDATE_PASSWORD_BEGIN,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE
} from "../action-types/account-recovery"

const initialState = {
  updatePasswordResponse: null,
  updatePasswordLoading: false,
  updatePasswordError: null,
  accountRecoveryResponse: null,
  accountRecoveryLoading: false,
  accountRecoveryError: null,
};

export default function accountRecoveryReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_RECOVERY_BEGIN:
      return {
        ...state,
        accountRecoveryLoading: true,
        accountRecoveryError: null
      };
    case ACCOUNT_RECOVERY_SUCCESS:
      return {
        ...state,
        accountRecoveryLoading: false,
        accountRecoveryError: null,
        accountRecoveryResponse: action.payload
      };
    case ACCOUNT_RECOVERY_FAILURE:
      return {
        ...state,
        accountRecoveryLoading: false,
        accountRecoveryError: action.payload.error.response.statusText,
        accountRecoveryResponse: null
      };
    case UPDATE_PASSWORD_BEGIN:
      return {
        ...state,
        updatePasswordLoading: true,
        updatePasswordError: null,
        updatePasswordResponse: null
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordError: null,
        updatePasswordResponse: action.payload
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        updatePasswordLoading: false,
        updatePasswordError: action.payload.error.response.statusText,
        updatePasswordResponse: null
      };
    default:
      return state;
  }
}