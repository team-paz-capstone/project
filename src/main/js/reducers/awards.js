import {
  FETCH_AWARDS_BEGIN,
  FETCH_AWARDS_SUCCESS,
  FETCH_AWARDS_FAILURE,
  CREATE_AWARD_BEGIN,
  CREATE_AWARD_SUCCESS,
  CREATE_AWARD_FAILURE,
} from "../action-types/awards"

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function awardsReducer(state = initialState, action) {
  switch (action.type) {
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
    case CREATE_AWARD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CREATE_AWARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREATE_AWARD_FAILURE:
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