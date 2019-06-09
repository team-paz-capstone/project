import { combineReducers } from 'redux';
import accountRecovery from './account-recovery';
import authentication from './authentication';
import awards from './awards';
import awardTypes from './award-types';
import offices from './offices';
import select from './select';
import users from './users';
import queries from './queries';
import views from './views';
import { LOG_OUT } from '../action-types';

const appReducer = combineReducers({
  accountRecovery,
  authentication,
  awards,
  awardTypes,
  offices,
  select,
  users,
  queries,
  views
});

// when log out, root reducer will reset all states in redux tree to initial states
const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
