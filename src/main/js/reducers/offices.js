/*
 * SOURCE: https://daveceddia.com/where-fetch-data-redux/
 * */
import {
  FETCH_OFFICES_BEGIN,
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_FAILURE
} from '../action-types/offices';

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function officesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_OFFICES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_OFFICES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.offices
      };

    case FETCH_OFFICES_FAILURE:
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
