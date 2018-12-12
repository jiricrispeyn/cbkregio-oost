import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Haptic, Constants } from 'expo';
import format from 'date-fns/format';
import locale from 'date-fns/locale/nl';
import colors from '../utils/colors';
import TrendingMatch from '../components/matches/TrendingMatch';

const { width } = Dimensions.get('window');

export default class TrendingMatches extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
  };

  onLayout = () => {
    if (this.state.opacity === 1) {
      return;
    }

    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  onSnapToItem() {
    if (
      Platform.OS === 'ios' &&
      parseInt(Constants.platform.ios.systemVersion) >= 10
    ) {
      Haptic.selection();
    }
  }

  renderTrendingMatch({ item, index }) {
    return (
      <TrendingMatch key={index} match={item} cardStyle={styles.cardStyle} />
    );
  }

  render() {
    const { date, matches } = this.props;
    const formattedDate = format(date, 'D MMMM YYYY', { locale });

    return (
      <React.Fragment>
        <View style={styles.header}>
          <Text style={styles.title}>Laatste speeldag</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Animated.View style={{ opacity: this.state.opacity }}>
          <Carousel
            data={matches}
            renderItem={this.renderTrendingMatch}
            sliderWidth={width}
            itemWidth={240}
            useScrollView={true}
            activeSlideAlignment="start"
            containerCustomStyle={styles.scrollView}
            onLayout={this.onLayout}
            onSnapToItem={this.onSnapToItem}
          />
        </Animated.View>
      </React.Fragment>
    );
  }
}

TrendingMatches.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  matches: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 14,
    color: colors.white,
    letterSpacing: 0.24,
  },
  date: {
    fontSize: 10,
    color: colors.chambray,
  },
  scrollView: {
    paddingTop: 14,
    paddingBottom: 31,
  },
  cardStyle: {
    marginLeft: 15,
  },
});
