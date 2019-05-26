import {combineReducers} from 'redux'
import authentication from "./authentication"
import users from "./users"

export default combineReducers({
  users,
  authentication
})
