import {
  FETCH_AWARDS_BEGIN,
  FETCH_AWARDS_SUCCESS,
  FETCH_AWARDS_FAILURE
} from "../action-types/awards"

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function awardTypesReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_AWARDS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_AWARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.awards
      };
    case FETCH_AWARDS_FAILURE:
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