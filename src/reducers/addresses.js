import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
} from '../actions/addresses';

const initialState = {};

export default function addressesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDRESSES_REQUEST:
      const leagueState = state[action.league] || {};
      return {
        ...state,
        [action.league]: {
          ...leagueState,
          loading: true,
          error: null,
          data: leagueState.data || [],
        },
      };
    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        [action.payload.league]: {
          loading: false,
          error: null,
          data: action.payload.addresses,
          receivedAt: action.receivedAt,
        },
      };
    case FETCH_ADDRESSES_FAILURE: {
      return {
        ...state,
        [league]: {
          loading: false,
          error: action.payload.error,
          data: [],
        },
      };
    }
    default:
      return state;
  }
}
