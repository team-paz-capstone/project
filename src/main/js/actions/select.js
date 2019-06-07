import ActionTypes from '../action-types/select';

export const selectItem = (id, value) => ({
  type: ActionTypes.SET_VALUE,
  payload: { id, value }
});
