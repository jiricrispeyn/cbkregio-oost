import colors from '../utils/colors';

export function getClubTextStyle(team, winner) {
  if (team !== winner) {
    return;
  }

  return { fontWeight: '500' };
}

export function getScoreTextStyle(team, winner) {
  if (!winner) {
    return;
  }

  if (team === winner) {
    return { color: colors.malachite };
  }

  return { color: colors.milanoRed };
}
