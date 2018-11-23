import { createSelector } from 'reselect';

const addressesListSelector = state => state.addressesList;
const setLeagueSelector = state => state.nav;

export const getSetLeagueAddresses = createSelector(
  addressesListSelector,
  setLeagueSelector,
  (addressesList, setLeague) => {
    return addressesList.leagues[setLeague] || [];
  }
);
