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
    return { color: '#0CC634' };
  }

  return { color: '#C60C0C' };
}
