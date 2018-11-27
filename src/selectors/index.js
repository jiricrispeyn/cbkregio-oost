import { createSelector } from 'reselect';
import { get } from 'lodash';

const activeLeagueSelector = state => state.nav;
const addressesSelector = state => state.addresses;
const leagueDetailSelector = state => state.leagueDetail;

export const getActiveAddresses = createSelector(
  addressesSelector,
  activeLeagueSelector,
  (addresses, activeLeague) => get(addresses, `${activeLeague}.items`) || []
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
