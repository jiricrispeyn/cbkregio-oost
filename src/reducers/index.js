import { combineReducers } from 'redux';
import leaguesList from './leagues';
import addressesList from './addresses';
import nav from './nav';

export default combineReducers({
  leaguesList,
  addressesList,
  nav,
});
