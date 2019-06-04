import {
  FETCH_AWARDS_BEGIN,
  FETCH_AWARDS_SUCCESS,
  FETCH_AWARDS_FAILURE,
  CREATE_AWARD_BEGIN,
  CREATE_AWARD_SUCCESS,
  CREATE_AWARD_FAILURE,
  DELETE_AWARD_BEGIN,
  DELETE_AWARD_SUCCESS,
  DELETE_AWARD_FAILURE
} from '../action-types/awards';

const initialState = {
  items: [],
  loading: false,
  error: null,
  needFetch: false
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
        items: action.payload.awards,
        needFetch: false
      };
    case FETCH_AWARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
        needFetch: true
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
        needFetch: true
      };
    case CREATE_AWARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
        needFetch: false
      };
    case DELETE_AWARD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_AWARD_SUCCESS:
      return {
        ...state,
        // return a new award list without the deleted award
        items: state.items.filter(item => item.id !== action.payload.id),
        loading: false,
        needFetch: false
      };
    case DELETE_AWARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
        needFetch: false
      };
    default:
      return state;
  }
}
