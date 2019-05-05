import * as api from '../config/api';

export function fetchScoresheet(leagueId, scoresheetId) {
  return async dispatch => {
    dispatch(await fetchScoresheetRequest(leagueId, scoresheetId));
    return api
      .fetchScoresheet(leagueId, scoresheetId)
      .then(res => {
        dispatch(fetchScoresheetSuccess(res));
        return res;
      })
      .catch(err => dispatch(fetchScoresheetFailure(err)));
  };
}

export const FETCH_SCORESHEET_REQUEST = 'FETCH_SCORESHEET_REQUEST';
export const FETCH_SCORESHEET_SUCCESS = 'FETCH_SCORESHEET_SUCCESS';
export const FETCH_SCORESHEET_FAILURE = 'FETCH_SCORESHEET_FAILURE';

export const fetchScoresheetRequest = (leagueId, scoresheetId) => ({
  type: FETCH_SCORESHEET_REQUEST,
  leagueId,
  scoresheetId,
});

export const fetchScoresheetSuccess = scoresheet => ({
  type: FETCH_SCORESHEET_SUCCESS,
  payload: scoresheet,
  receivedAt: Date.now(),
});

export const fetchScoresheetFailure = error => ({
  type: FETCH_SCORESHEET_FAILURE,
  payload: { error },
});
