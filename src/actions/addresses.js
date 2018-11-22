import * as api from '../config/api';

export function fetchAddresses(league) {
  return async dispatch => {
    dispatch(await fetchAddressesRequest());
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

export const fetchAddressesRequest = () => ({
  type: FETCH_ADDRESSES_REQUEST,
});

export const fetchAddressesSuccess = addresses => ({
  type: FETCH_ADDRESSES_SUCCESS,
  payload: addresses,
});

export const fetchAddressesFailure = error => ({
  type: FETCH_ADDRESSES_FAILURE,
  payload: { error },
});
