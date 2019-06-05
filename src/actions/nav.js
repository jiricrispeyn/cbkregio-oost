export const SET_LEAGUE = 'SET_LEAGUE';
export const SET_SCORESHEET = 'SET_SCORESHEET';

export const setLeague = league => ({
  type: SET_LEAGUE,
  payload: league,
});

export const setScoresheet = scoresheet => ({
  type: SET_SCORESHEET,
  payload: scoresheet,
});
