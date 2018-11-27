import { combineReducers } from 'redux';
import leagues from './leagues';
import addresses from './addresses';
import nav from './nav';

export default combineReducers({
  leagues,
  addresses,
  nav,
});
