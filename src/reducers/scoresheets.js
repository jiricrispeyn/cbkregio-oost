import {
  FETCH_SCORESHEET_REQUEST,
  FETCH_SCORESHEET_SUCCESS,
  FETCH_SCORESHEET_FAILURE,
} from '../actions/scoresheet';

const initialState = {};

export default function scoresheetReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SCORESHEET_REQUEST:
      const scoresheetState = state[action.scoresheetId] || {};

      return {
        ...state,
        [action.scoresheetId]: {
          ...scoresheetState,
          loading: true,
          error: null,
          data: scoresheetState.data || [],
        },
      };
    case FETCH_SCORESHEET_SUCCESS:
      console.log(action);
      return {
        ...state,
        [action.payload.id]: {
          loading: false,
          error: null,
          data: action.payload,
          receivedAt: action.receivedAt,
        },
      };
    case FETCH_SCORESHEET_FAILURE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
