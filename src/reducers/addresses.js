import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
} from '../actions/addresses';
import { get } from 'lodash';

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
          items: leagueState.items || [],
        },
      };
    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        [action.payload.league]: {
          loading: false,
          error: null,
          items: action.payload.addresses,
          receivedAt: action.receivedAt,
        },
      };
    case FETCH_ADDRESSES_FAILURE: {
      return {
        ...state,
        [league]: {
          loading: false,
          error: action.payload.error,
          items: [],
        },
      };
    }
    default:
      return state;
  }
}
