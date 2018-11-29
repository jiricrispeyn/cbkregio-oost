import * as api from '../config/api';

export function fetchPlayers(league) {
  return async dispatch => {
    dispatch(await fetchPlayersRequest(league));
    return api
      .fetchPlayers(league)
      .then(res => {
        dispatch(fetchPlayersSuccess(res));
        return res;
      })
      .catch(err => dispatch(fetchPlayersFailure(err)));
  };
}

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_REQUEST';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';

export const fetchPlayersRequest = league => ({
  type: FETCH_PLAYERS_REQUEST,
  league,
});

export const fetchPlayersSuccess = players => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: players,
  receivedAt: Date.now(),
});

export const fetchPlayersFailure = error => ({
  type: FETCH_PLAYERS_FAILURE,
  payload: { error },
});
