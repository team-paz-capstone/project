import {combineReducers} from 'redux'
import authentication from "./authentication"
import awardTypes from "./award-types"
import users from "./users"

export default combineReducers({
  authentication,
  awardTypes,
  users,
})
