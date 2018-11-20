import * as api from '../config/api';

export function fetchLeagues() {
  return async dispatch => {
    dispatch(await fetchLeaguesRequest());
    return api
      .fetchLeagues()
      .then(res => {
        dispatch(fetchLeaguesSuccess(res.leagues));
        return res.leagues;
      })
      .catch(err => dispatch(fetchLeaguesFailure(err)));
  };
}

export const FETCH_LEAGUES_REQUEST = 'FETCH_LEAGUES_REQUEST';
export const FETCH_LEAGUES_SUCCESS = 'FETCH_LEAGUES_SUCCESS';
export const FETCH_LEAGUES_FAILURE = 'FETCH_LEAGUES_FAILURE';

export const fetchLeaguesRequest = () => ({
  type: FETCH_LEAGUES_REQUEST,
});

export const fetchLeaguesSuccess = leagues => ({
  type: FETCH_LEAGUES_SUCCESS,
  payload: { leagues },
});

export const fetchLeaguesFailure = error => ({
  type: FETCH_LEAGUES_FAILURE,
  payload: { error },
});
