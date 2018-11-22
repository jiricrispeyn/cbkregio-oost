import {
  FETCH_ADDRESSES_REQUEST,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_FAILURE,
} from '../actions/addresses';

const initialState = {
  leagues: {},
  loading: false,
  error: null,
};

export default function addressesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADDRESSES_SUCCESS:
      const { league, addresses } = action.payload;
      return {
        ...state,
        loading: false,
        leagues: {
          ...state.leagues,
          [league]: addresses,
        },
      };
    case FETCH_ADDRESSES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        leagues: {},
      };
    }
    default:
      return state;
  }
}
