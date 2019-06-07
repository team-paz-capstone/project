import {
  FETCH_USER_COUNT_BY_OFFICE_BEGIN,
  FETCH_USER_COUNT_BY_OFFICE_SUCCESS,
  FETCH_USER_COUNT_BY_OFFICE_FAILURE,
  FETCH_AWARD_COUNT_BY_USER_BEGIN,
  FETCH_AWARD_COUNT_BY_USER_SUCCESS,
  FETCH_AWARD_COUNT_BY_USER_FAILURE
} from '../action-types/queries';

const initialState = {
  officeByUser: [],
  userByAward: [],
  loading: false,
  error: null
};

export default function queriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_COUNT_BY_OFFICE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_USER_COUNT_BY_OFFICE_SUCCESS:
      return {
        ...state,
        loading: false,
        officeByUser: action.payload.officeByUser
      };

    case FETCH_USER_COUNT_BY_OFFICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        officeByUser: []
      };

    case FETCH_AWARD_COUNT_BY_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_AWARD_COUNT_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userByAward: action.payload.userByAward
      };

    case FETCH_AWARD_COUNT_BY_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userByAward: []
      };

    default:
      return state;
  }
}
