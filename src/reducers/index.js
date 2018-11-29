import { combineReducers } from 'redux';
import leagues from './leagues';
import addresses from './addresses';
import leagueDetail from './league-detail';
import players from './players';
import nav from './nav';

export default combineReducers({
  leagues,
  addresses,
  leagueDetail,
  players,
  nav,
});
