import { combineReducers } from 'redux';
import leagues from './leagues';
import addresses from './addresses';
import leagueDetail from './league-detail';
import nav from './nav';

export default combineReducers({
  leagues,
  addresses,
  leagueDetail,
  nav,
});
