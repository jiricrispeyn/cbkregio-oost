import { SET_LEAGUE, SET_SCORESHEET } from '../actions/nav';

const initialState = {
  league: null,
  scoresheet: null,
};

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LEAGUE:
      return {
        ...state,
        league: action.payload,
      };
    case SET_SCORESHEET:
      return {
        ...state,
        scoresheet: action.payload,
      };
    default:
      return state;
  }
}
