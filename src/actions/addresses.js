import * as api from '../config/api';

export function fetchAddresses(league) {
  return async dispatch => {
    dispatch(await fetchAddressesRequest(league));
    return api
      .fetchAddresses(league)
      .then(res => {
        dispatch(fetchAddressesSuccess(res));
        return res;
      })
      .catch(err => dispatch(fetchAddressesFailure(err)));
  };
}

export const FETCH_ADDRESSES_REQUEST = 'FETCH_ADDRESSES_REQUEST';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';

export const fetchAddressesRequest = league => ({
  type: FETCH_ADDRESSES_REQUEST,
  league,
});

export const fetchAddressesSuccess = addresses => ({
  type: FETCH_ADDRESSES_SUCCESS,
  payload: addresses,
  receivedAt: Date.now(),
});

export const fetchAddressesFailure = error => ({
  type: FETCH_ADDRESSES_FAILURE,
  payload: { error },
});
