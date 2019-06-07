import { SET_VALUE } from '../action-types/select';

const initialState = {
  items: {}
};

export default function selectReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VALUE:
      let value = action.payload.value;
      let newState = { ...state.items };
      newState[action.payload.id] = value;
      return {
        items: newState
      };

    default:
      return state;
  }
}
