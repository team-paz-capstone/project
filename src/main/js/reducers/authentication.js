/**
 * I was looking at this documentation when modeling:
 * https://github.com/reduxjs/redux/tree/master/examples/shopping-cart/src/reducers
 * */
const initialState = {
  auth: true,
};

const authentication = (state = initialState, action) => {
  return state.auth;
};

export const isAuthenticated = (state) => state.auth;

export default authentication;