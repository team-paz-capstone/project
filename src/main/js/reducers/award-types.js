import {
  FETCH_AWARD_TYPES_BEGIN,
  FETCH_AWARD_TYPES_SUCCESS,
  FETCH_AWARD_TYPES_FAILURE
} from "../action-types/award-types"

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function awardTypesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_AWARD_TYPES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_AWARD_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.awardTypes
      };
    case FETCH_AWARD_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };
    default:
      return state;
  }
}