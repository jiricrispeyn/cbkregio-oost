import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getClubTextStyle, getScoreTextStyle } from '../../utils/match';
import colors from '../../utils/colors';

const Match = props => {
  const { match, position, isFirst, isLast } = props;
  const isEven = position % 2 === 0;

  return (
    <View
      style={[
        styles.container,
        isFirst && styles.isFirst,
        isLast && styles.isLast,
      ]}
    >
      <View style={[styles.left, !isEven && styles.background]}>
        <Text style={[styles.club, getClubTextStyle('home', match.winner)]}>
          {match.home.club}
        </Text>
        <Text
          style={[
            styles.club,
            { marginTop: 10 },
            getClubTextStyle('away', match.winner),
          ]}
        >
          {match.away.club}
        </Text>
      </View>
      <View style={[styles.right, isEven && styles.background]}>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, getScoreTextStyle('home', match.winner)]}>
            {match.home.score}
          </Text>
          <Text
            style={[
              styles.score,
              { marginTop: 10 },
              getScoreTextStyle('away', match.winner),
            ]}
          >
            {match.away.score}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderColor: colors.mystic,
    overflow: 'hidden',
  },
  isFirst: {
    borderTopWidth: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  isLast: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  background: {
    backgroundColor: colors.whisper,
  },
  left: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  right: {
    width: 85,
    borderLeftWidth: 1,
    borderColor: colors.mystic,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  club: {
    color: colors.firefly,
    fontSize: 12,
    letterSpacing: 0.14,
  },
  score: {
    color: colors.firefly,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.24,
  },
});

export default Match;
