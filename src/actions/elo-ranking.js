import * as api from '../config/api';

export function fetchEloRanking(league) {
  return async dispatch => {
    dispatch(await fetchEloRankingRequest(league));
    return api
      .fetchEloRanking(league)
      .then(res => {
        dispatch(fetchEloRankingSuccess(res));
        return res;
      })
      .catch(err => dispatch(fetchEloRankingFailure(err)));
  };
}

export const FETCH_ELO_RANKING_REQUEST = 'FETCH_ELO_RANKING_REQUEST';
export const FETCH_ELO_RANKING_SUCCESS = 'FETCH_ELO_RANKING_SUCCESS';
export const FETCH_ELO_RANKING_FAILURE = 'FETCH_ELO_RANKING_FAILURE';

export const fetchEloRankingRequest = league => ({
  type: FETCH_ELO_RANKING_REQUEST,
  league,
});

export const fetchEloRankingSuccess = players => ({
  type: FETCH_ELO_RANKING_SUCCESS,
  payload: players,
  receivedAt: Date.now(),
});

export const fetchEloRankingFailure = error => ({
  type: FETCH_ELO_RANKING_FAILURE,
  payload: { error },
});
