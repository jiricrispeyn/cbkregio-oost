import {
  FETCH_SCORESHEET_REQUEST,
  FETCH_SCORESHEET_SUCCESS,
  FETCH_SCORESHEET_FAILURE,
} from '../actions/scoresheet';

const initialState = {};

export default function scoresheetReducer(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case FETCH_SCORESHEET_REQUEST:
      const leagueState = state[action.league] || {};
      const { results = [], tables = [] } = leagueState;
      return {
        ...state,
        // [action.league]: {
        //   ...leagueState,
        //   loading: true,
        //   error: null,
        //   results,
        //   tables,
        // },
      };
    case FETCH_SCORESHEET_SUCCESS:
      return {
        ...state,
        // [action.payload.league]: {
        //   loading: false,
        //   error: null,
        //   results: action.payload.results,
        //   tables: action.payload.tables,
        //   receivedAt: action.receivedAt,
        // },
      };
    case FETCH_SCORESHEET_FAILURE: {
      return {
        ...state,
        // [league]: {
        //   loading: false,
        //   error: action.payload.error,
        // results: [],
        // tables: [],
        // },
      };
    }
    default:
      return state;
  }
}
