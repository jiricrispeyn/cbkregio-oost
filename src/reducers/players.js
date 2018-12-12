import {
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
} from '../actions/players';

const initialState = {};

export default function playersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST:
      const playersState = state[action.league] || {};
      return {
        ...state,
        [action.league]: {
          ...playersState,
          loading: true,
          error: null,
          data: playersState.data || [],
        },
      };
    case FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        [action.payload.league]: {
          loading: false,
          error: null,
          data: action.payload.players,
          receivedAt: action.receivedAt,
        },
      };
    case FETCH_PLAYERS_FAILURE: {
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
