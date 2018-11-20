import {
  FETCH_LEAGUES_REQUEST,
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_FAILURE,
} from '../actions/leagues';

const initialState = {
  leagues: [],
  loading: false,
  error: null,
};

export default function leaguesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LEAGUES_SUCCESS:
      return {
        ...state,
        loading: false,
        leagues: action.payload.leagues,
      };
    case FETCH_LEAGUES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        leagues: [],
      };
    }
    default:
      return state;
  }
}
