import { createSelector } from 'reselect';
import { get } from 'lodash';

const addressesSelector = state => state.addresses;
const activeLeagueSelector = state => state.nav;

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
