import React, { PureComponent } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { keyBy } from 'lodash';
import closestIndexTo from 'date-fns/closest_index_to';
import isBefore from 'date-fns/is_before';
import differenceInDays from 'date-fns/difference_in_days';
import format from 'date-fns/format';
import locale from 'date-fns/locale/nl';
import { API_URL } from '../config/api';
import TrendingMatch from '../components/matches/TrendingMatch';
import Match from '../components/matches/Match';
import Datepicker from '../components/datepicker/Datepicker';

class TablesScreen extends PureComponent {
  state = {
    isLoading: true,
    refreshing: false,
    results: [],
    resultsByDate: null,
    trendingMatches: null,
    selectedDate: null,
  };

  async getLeagueDetail(id) {
    return fetch(`${API_URL}/leagues/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  getTrendingMatches(results) {
    const now = new Date();
    const dates = results.map(result => result._date);
    const closestIndex = closestIndexTo(now, dates);
    const shouldShowPrev =
      closestIndex > 0 &&
      isBefore(now, results[closestIndex]._date) &&
      differenceInDays(now, results[closestIndex]._date) < -1;

    return shouldShowPrev ? results[closestIndex - 1] : results[closestIndex];
  }

  getDefaultSelected(results) {
    const { _date } = results.find(result => result.matches);

    return _date;
  }

  getDates(results) {
    return results.reduce(
      (acc, result) => {
        const dates = [...acc.dates, result._date];
        const disabledDates = !result.matches
          ? [...acc.disabledDates, result._date]
          : acc.disabledDates;

        return { dates, disabledDates };
      },
      {
        dates: [],
        disabledDates: [],
      }
    );
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    let { results } = await this.getLeagueDetail(league);

    results = results.map(result => {
      const [day, month, year] = result.date.split('-');
      const _date = new Date(year, month - 1, day);

      return { _date, ...result };
    });

    const resultsByDate = keyBy(results, 'date');
    const trendingMatches = this.getTrendingMatches(results);
    const selectedDate = this.getDefaultSelected(results);

    this.setState({
      results,
      resultsByDate,
      trendingMatches,
      selectedDate,
      isLoading: false,
    });
  }

  renderTrendingMatches(trendingMatches) {
    if (!trendingMatches) {
      return;
    }

    const date = format(trendingMatches._date, 'D MMMM YYYY', { locale });

    return (
      <View>
        <View style={styles.trendingHeader}>
          <Text style={styles.trendingTitle}>Laatste speeldag</Text>
          <Text style={styles.trendingDate}>{date}</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.trendingScrollView}
          contentContainerStyle={styles.trendingContentContainerStyle}
        >
          {trendingMatches.matches.map((match, i) => (
            <TrendingMatch
              key={i}
              match={match}
              cardStyle={styles.trendingCardStyle}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  renderResultsByDate(resultsByDate, selectedDate) {
    if (!resultsByDate || !selectedDate) {
      return;
    }

    const results = resultsByDate[format(selectedDate, 'DD-MM-YYYY')];

    if (!results) {
      return;
    }

    const { _date, matches } = results;
    const date = format(_date, 'D MMMM YYYY', { locale });

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>{date}</Text>
        <View style={{ marginTop: 14 }}>
          {matches.map((match, i) => (
            <Match
              key={i}
              match={match}
              position={i}
              isFirst={i === 0}
              isLast={i === matches.length - 1}
            />
          ))}
        </View>
      </View>
    );
  }

  onPress(selectedDate) {
    this.setState({ selectedDate });
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const { navigation } = this.props;
    const league = navigation.getParam('league', null);
    let { results } = await this.getLeagueDetail(league);

    results = results.map(result => {
      const [day, month, year] = result.date.split('-');
      const _date = new Date(year, month - 1, day);

      return { _date, ...result };
    });

    const resultsByDate = keyBy(results, 'date');
    const trendingMatches = this.getTrendingMatches(results);

    this.setState({
      refreshing: false,
      resultsByDate,
      trendingMatches,
    });
  };

  render() {
    const {
      isLoading,
      results,
      resultsByDate,
      trendingMatches,
      selectedDate,
    } = this.state;

    if (isLoading) {
      return (
        <View style={[styles.screen, { justifyContent: 'center' }]}>
          <ActivityIndicator />
        </View>
      );
    }

    const { dates, disabledDates } = this.getDates(results);

    return (
      <View style={styles.screen}>
        <Datepicker
          dates={dates}
          selected={selectedDate}
          disabled={disabledDates}
          style={styles.datepicker}
          onPress={this.onPress.bind(this)}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.renderTrendingMatches(trendingMatches)}
          {this.renderResultsByDate(resultsByDate, selectedDate)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
  },
  datepicker: {
    marginTop: 30,
    height: 60,
  },
  scrollView: {
    marginTop: 15,
  },
  contentContainerStyle: {
    paddingBottom: 15,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
  },
  trendingTitle: {
    fontSize: 14,
    color: '#fff',
    letterSpacing: 0.24,
  },
  trendingDate: {
    fontSize: 10,
    color: '#3D618F',
  },
  trendingScrollView: {
    paddingTop: 14,
    paddingBottom: 31,
  },
  trendingContentContainerStyle: {
    paddingLeft: 15,
  },
  trendingCardStyle: {
    marginRight: 15,
  },
  resultsContainer: {
    marginHorizontal: 15,
  },
  resultsTitle: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 0.24,
  },
});

export default TablesScreen;
