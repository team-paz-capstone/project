import {combineReducers} from 'redux'
import accountRecovery from "./account-recovery"
import authentication from "./authentication"
import awards from "./awards"
import awardTypes from "./award-types"
import offices from "./offices"
import select from "./select"
import users from "./users"

export default combineReducers({
  accountRecovery,
  authentication,
  awards,
  awardTypes,
  offices,
  select,
  users,
})
