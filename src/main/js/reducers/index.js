/**
 * https://github.com/reduxjs/redux/blob/master/examples/shopping-cart/src/reducers/index.js
 */
import {combineReducers} from 'redux'
import authentication from "./authentication"
import isAuthenticated from "./authentication"

export default combineReducers({
  authentication
})

export const authenticated = state => isAuthenticated(state);