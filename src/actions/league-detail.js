import * as api from '../config/api';

export function fetchLeagueDetail(league) {
  return async dispatch => {
    dispatch(await fetchLeagueDetailRequest(league));
    return api
      .fetchLeagueDetail(league)
      .then(res => {
        dispatch(fetchLeagueDetailSuccess(res));
        return res;
      })
      .catch(err => dispatch(fetchLeagueDetailFailure(err)));
  };
}

export const FETCH_LEAGUE_DETAIL_REQUEST = 'FETCH_LEAGUE_DETAIL_REQUEST';
export const FETCH_LEAGUE_DETAIL_SUCCESS = 'FETCH_LEAGUE_DETAIL_SUCCESS';
export const FETCH_LEAGUE_DETAIL_FAILURE = 'FETCH_LEAGUE_DETAIL_FAILURE';

export const fetchLeagueDetailRequest = league => ({
  type: FETCH_LEAGUE_DETAIL_REQUEST,
  league,
});

export const fetchLeagueDetailSuccess = leagueDetail => ({
  type: FETCH_LEAGUE_DETAIL_SUCCESS,
  payload: leagueDetail,
  receivedAt: Date.now(),
});

export const fetchLeagueDetailFailure = error => ({
  type: FETCH_LEAGUE_DETAIL_FAILURE,
  payload: { error },
});
