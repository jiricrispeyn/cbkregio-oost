import { SET_LEAGUE } from '../actions/nav';

const initialState = null;

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LEAGUE:
      return action.payload;
    default:
      return state;
  }
}
