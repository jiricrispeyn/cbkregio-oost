export default function leagues(state = [], action) {
  switch (action.type) {
    case 'SET_LEAGUES':
      return state.concat([action.text]);
    default:
      return state;
  }
}
