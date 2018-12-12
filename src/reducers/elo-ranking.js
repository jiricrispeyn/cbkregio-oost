import {
  FETCH_ELO_RANKING_REQUEST,
  FETCH_ELO_RANKING_SUCCESS,
  FETCH_ELO_RANKING_FAILURE,
} from '../actions/elo-ranking';

const initialState = {};

export default function eloRankingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ELO_RANKING_REQUEST:
      const eloRankingState = state[action.league] || {};
      return {
        ...state,
        [action.league]: {
          ...eloRankingState,
          loading: true,
          error: null,
          data: eloRankingState.data || [],
        },
      };
    case FETCH_ELO_RANKING_SUCCESS:
      return {
        ...state,
        [action.payload.league]: {
          loading: false,
          error: null,
          data: action.payload.players,
          receivedAt: action.receivedAt,
        },
      };
    case FETCH_ELO_RANKING_FAILURE: {
      return {
        ...state,
        [league]: {
          loading: false,
          error: action.payload.error,
          // data: [],
        },
      };
    }
    default:
      return state;
  }
}
