import { combineReducers } from 'redux';
import leagues from './leagues';
import addresses from './addresses';
import leagueDetail from './league-detail';
import players from './players';
import eloRanking from './elo-ranking';
import scoresheet from './scoresheet';
import nav from './nav';

export default combineReducers({
  leagues,
  addresses,
  leagueDetail,
  players,
  eloRanking,
  scoresheet,
  nav,
});
