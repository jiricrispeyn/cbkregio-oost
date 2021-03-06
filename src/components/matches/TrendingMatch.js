import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, ViewPropTypes } from 'react-native';
import { LinearGradient } from 'expo';
import { getClubTextStyle, getScoreTextStyle } from '../../utils/match';
import colors, { lightGrayGradient } from '../../utils/colors';

const TrendingMatch = props => {
  const { match, cardStyle } = props;

  return (
    <View style={[styles.trendingCard, cardStyle]}>
      <View style={styles.trendingLeft}>
        <View style={styles.trendingClub}>
          <Text
            numberOfLines={1}
            style={[
              styles.trendingClubText,
              getClubTextStyle('home', match.winner),
            ]}
          >
            {match.home.club}
          </Text>
        </View>
        <View style={[styles.trendingClub, styles.trendingClubDivider]}>
          <Text
            numberOfLines={1}
            style={[
              styles.trendingClubText,
              getClubTextStyle('away', match.winner),
            ]}
          >
            {match.away.club}
          </Text>
        </View>
      </View>
      <View style={styles.trendingRight}>
        <LinearGradient
          colors={lightGrayGradient}
          style={styles.trendingRightGradient}
        >
          <View style={styles.trendingScore}>
            <Text
              style={[
                styles.trendingScoreText,
                getScoreTextStyle('home', match.winner),
              ]}
            >
              {match.home.score}
            </Text>
          </View>
          <View style={styles.trendingScore}>
            <Text
              style={[
                styles.trendingScoreText,
                getScoreTextStyle('away', match.winner),
              ]}
            >
              {match.away.score}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

TrendingMatch.propTypes = {
  match: PropTypes.object.isRequired,
  cardStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  trendingCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    elevation: 1,
  },
  trendingLeft: {
    width: 170,
  },
  trendingClub: {
    padding: 20,
  },
  trendingClubText: {
    color: colors.firefly,
    fontSize: 12,
    letterSpacing: 0.14,
  },
  trendingClubDivider: {
    borderTopWidth: 1,
    borderColor: colors.mystic,
  },
  trendingRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
  trendingRightGradient: {
    flex: 1,
    width: 70,
    borderLeftWidth: 1,
    borderColor: colors.mystic,
  },
  trendingScore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendingScoreText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default TrendingMatch;
