import {
  FETCH_LEAGUE_DETAIL_REQUEST,
  FETCH_LEAGUE_DETAIL_SUCCESS,
  FETCH_LEAGUE_DETAIL_FAILURE,
} from '../actions/league-detail';

const initialState = {};

export default function leagueDetailReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUE_DETAIL_REQUEST:
      const leagueState = state[action.league] || {};
      const { results = [], tables = [] } = leagueState;
      return {
        ...state,
        [action.league]: {
          ...leagueState,
          loading: true,
          error: null,
          results,
          tables,
        },
      };
    case FETCH_LEAGUE_DETAIL_SUCCESS:
      return {
        ...state,
        [action.payload.league]: {
          loading: false,
          error: null,
          results: action.payload.results,
          tables: action.payload.tables,
          receivedAt: action.receivedAt,
        },
      };
    case FETCH_LEAGUE_DETAIL_FAILURE: {
      return {
        ...state,
        [league]: {
          loading: false,
          error: action.payload.error,
          // results: [],
          // tables: [],
        },
      };
    }
    default:
      return state;
  }
}
