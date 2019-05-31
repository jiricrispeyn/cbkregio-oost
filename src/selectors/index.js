import { createSelector } from 'reselect';
import { get } from 'lodash';

const activeLeagueSelector = state => state.nav;
const addressesSelector = state => state.addresses;
const leagueDetailSelector = state => state.leagueDetail;
const playersSelector = state => state.players;
const eloRankingSelector = state => state.eloRanking;
export const scoresheetsSelector = state => state.scoresheets;

export const getActiveAddresses = createSelector(
  addressesSelector,
  activeLeagueSelector,
  (addresses, activeLeague) => get(addresses, `${activeLeague}.data`) || []
);

export const isActiveAddressesLoading = createSelector(
  addressesSelector,
  activeLeagueSelector,
  (addresses, activeLeague) => get(addresses, `${activeLeague}.loading`)
);

export const getActiveAddressesError = createSelector(
  addressesSelector,
  activeLeagueSelector,
  (addresses, activeLeague) => get(addresses, `${activeLeague}.error`)
);

export const getActiveTables = createSelector(
  leagueDetailSelector,
  activeLeagueSelector,
  (leagueDetail, activeLeague) =>
    get(leagueDetail, `${activeLeague}.tables`) || []
);

export const getActiveResults = createSelector(
  leagueDetailSelector,
  activeLeagueSelector,
  (leagueDetail, activeLeague) =>
    get(leagueDetail, `${activeLeague}.results`) || []
);

export const isActiveLeagueDetailLoading = createSelector(
  leagueDetailSelector,
  activeLeagueSelector,
  (leagueDetail, activeLeague) => get(leagueDetail, `${activeLeague}.loading`)
);

export const getActiveLeagueDetailError = createSelector(
  leagueDetailSelector,
  activeLeagueSelector,
  (leagueDetail, activeLeague) => get(leagueDetail, `${activeLeague}.error`)
);

export const getActivePlayers = createSelector(
  playersSelector,
  activeLeagueSelector,
  (players, activeLeague) => get(players, `${activeLeague}.data`) || []
);

export const isActivePlayersLoading = createSelector(
  playersSelector,
  activeLeagueSelector,
  (players, activeLeague) => get(players, `${activeLeague}.loading`)
);

export const getActivePlayersError = createSelector(
  playersSelector,
  activeLeagueSelector,
  (players, activeLeague) => get(players, `${activeLeague}.error`)
);

export const getActiveEloRanking = createSelector(
  eloRankingSelector,
  activeLeagueSelector,
  (players, activeLeague) => get(players, `${activeLeague}.data`) || []
);

export const isActiveEloRankingLoading = createSelector(
  eloRankingSelector,
  activeLeagueSelector,
  (players, activeLeague) => get(players, `${activeLeague}.loading`)
);

export const getActiveEloRankingError = createSelector(
  eloRankingSelector,
  activeLeagueSelector,
  (players, activeLeague) => get(players, `${activeLeague}.error`)
);
