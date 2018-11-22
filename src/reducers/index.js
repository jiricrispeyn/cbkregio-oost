import { combineReducers } from 'redux';
import leaguesList from './leagues';
import addressesList from './addresses';

export default combineReducers({
  leaguesList,
  addressesList,
});
